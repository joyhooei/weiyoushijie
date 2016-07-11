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
            if(myProject.id == this.myProject.id) {
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
			var diamond = this.ratio(1, this._myProject.tool_ratio - 1) * 0.7;
			application.showUI(new ResetUI(this._myProject, this._project, diamond));
		} else {
			Toast.launch('还没有购买过金手指');
		}
	}
	
	private buy(price: number, step: number): void {
        if (application.customer.diamond >= price) {
			let oldOutput = this.output();
            this._myProject.tool_ratio = this.ratio(this._myProject.tool_ratio, step);
            application.buyOutput(0,price,this.output() - oldOutput);
            application.dao.save("Project",this._myProject);
			
			esa.EgretSA.onDiamondUse("购买了金手指", 1, price);
            
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
				125000000, 
				625000000, 
				5000000000, 
				40000000000, 
				200000000000
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
        return this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    }
}
