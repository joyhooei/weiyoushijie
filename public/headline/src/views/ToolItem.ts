class ToolItem extends eui.Component {
    private _myProject: any;
    private _project: any;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
	
	private img100: eui.Image;
	private img900: eui.Image;
	
	private imgReset: eui.Image;
	
	private lbl100: eui.Label;
	private lbl900: eui.Label;
	private lbl1: eui.Label;
	
    public constructor(myProject: any,project: any,iconName: string,titleName: string) {
        super();

        this._project = project;
        this._myProject = myProject;

        this.skinName = "resource/custom_skins/toolItemSkin.exml";
		
		this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(100, 1);
		}, this);
		
		this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(900, 10);
		}, this);
		
		this.imgReset.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.reset();
		}, this);
		
		application.dao.addEventListener("Project", function(ev:egret.Event){
            var myProject = ev.data;
            if(myProject.id == this._myProject.id) {
                this.myProject = myProject;                
                this.refresh();
    		}
    	}, this);	

        this.imgIcon.source  = iconName;
        this.imgTitle.source = titleName;
		
		this.refresh();
    }
	
	public refresh():void {
		this.lbl1.text   = application.format(this._myProject.tool_ratio);
		this.lbl100.text = application.format(this.ratio(this._myProject.tool_ratio, 1));
		this.lbl900.text = application.format(this.ratio(this._myProject.tool_ratio, 10));
	}
	
	private reset(): void {
		if (this._myProject.tool_ratio > 1) {
    		var boughts = 0;
    		var ratio = 1;
    		while (ratio < this._myProject.tool_ratio) {
    		    boughts ++;
    		    
    		    ratio = this.ratio(1, boughts);
    		}
    		
            var diamond = 630 * Math.floor(boughts / 10) + 70 * (boughts % 10);
			application.showUI(new ResetUI(this._myProject, this._project, diamond));
		} else {
			Toast.launch('还没有购买过金手指，不能重置');
		}
	}
	
	private buy(price: number, step: number): void {
        if (application.customer.diamond >= price) {
			let oldOutput = this.output();
            this._myProject.tool_ratio = this.ratio(this._myProject.tool_ratio, step);
            application.buyOutput(0,price,this.output() - oldOutput);
            application.dao.save("Project",this._myProject);
			
			application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了金手指", price); 
            
            Toast.launch("成功购买了金手指");
            this.refresh();
		} else {
			application.showUI(new ChargeTipUI());
		}
	}
	
	//购买一次的倍数
	private ratioOne(oldRatio: number): number {
		var ratios = [
				1, 
				5, 
				50, 
				200, 
				2000, 
				10000, 
				100000, 
				500000, 
				5000000, 
				25000000, 
				250000000, 
				2500000000, 
				25000000000, 
				250000000000, 
				2500000000000,
				12500000000000,
				125000000000000,
				1250000000000000,
				12500000000000000,
				62500000000000000,
				625000000000000000,
				6250000000000000000,
				31250000000000000000,
				312500000000000000000,
				3125000000000000000000,
				31250000000000000000000,
				156250000000000000000000,
				1562500000000000000000000,
				15625000000000000000000000,
				156250000000000000000000000
			];
			
		var i = application.log10(oldRatio);
		if (i < ratios.length) {
			return oldRatio + ratios[i];
		} else {
			var delta = ratios[ratios.length - 1];
			for (var j = 0; j < (i - ratios.length); j++) {
				delta = delta * 10;
			}
			return oldRatio + delta;
		}
	}
	
	//购买十次的倍数
	private ratio(oldRatio: number, step: number):number {
		for (var i = 0; i < step; i++) {
			oldRatio = this.ratioOne(oldRatio);
		}
		
		return oldRatio;
	}
	
	private output(): number {
        return application.vip.getOutput(this._project.output(this._myProject.level,this._myProject.achieve,this._myProject.tool_ratio));
    }
}
