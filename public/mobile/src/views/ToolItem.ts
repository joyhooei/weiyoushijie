class ToolItem extends eui.Component {
    private _myProject: any;
    private _project: any;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
	
	private img100: eui.Image;
	private img900: eui.Image;

    public constructor(myproject: any,project: any,iconName: string,titleName: string) {
        super();

        this._project = project;
        this._myProject = myproject;

        this.skinName = "resource/custom_skins/toolItemSkin.exml";
		
		this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(100, 1);
		}, this);
		
		this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(900, 10);
		}, this);		

        this.imgIcon.source  = iconName;
        this.imgTitle.source = titleName;
    }
	
	private buy(price: number, step: number): void {
    	var self = this;
    	
        if (application.customer.diamond >= price) {
			let oldOutput = this.output();
			self._myProject.tool_ratio = self.ratio(self._myProject.tool_ratio, step);
			application.dao.save("Project",self._myProject, function(succeed, proj) {
				if (succeed) {
					application.buyOutput(0, price, self.output() - oldOutput, self._myProject, function(succeed, c){
						if (succeed) {
							Toast.launch("购买成功");
						} else {
							Toast.launch("购买失败");    
						}
					});
				} else {
					Toast.launch("购买失败");
				}
			});
		} else {
			application.charge();
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
			oldRatio = ratioOne(oldRatio);
		}
		
		return oldRatio;
	}
	
	private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    }
}
