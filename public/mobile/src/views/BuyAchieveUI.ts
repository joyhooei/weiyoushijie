class BuyAchieveUI extends eui.Component{
    private imgBack: eui.Image;
    
    private imgBuyUseGold:eui.Image;
    private imgBuyUseDiamond: eui.Image;
    
    private lblGold:eui.Label;
    private lblDiamond:eui.Label;
    
    private _myProject: any;
    private _project: Project;
    
    constructor(myProject: any,project: Project) {
        super();
        
        this._myProject = myProject;
        this._project = project;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        let p = this._project.goldPriceOfAchieve(this._myProject.achieve + 1);
        this.lblGold.text = p.toString();
        if (application.customer.gold < p) {
            this.imgBuyUseGold.source = "buttoncoinno_png";
		} else {
            this.imgBuyUseGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
				this.buyAchieveUseGold();
			}, this );
		}

        p = this._project.diamondPriceOfAchieve(this._myProject.achieve + 1);
        this.lblDiamond.text = p.toString();
        if (application.customer.diamond < p) {
            this.imgBuyUseDiamond.source = "buttondiano_png";
		} else {
            this.imgBuyUseDiamond.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.buyAchieveUseDiamond();
			}, this );
		}
    }

    private output(): number {
        return this._project.output(this._myProject.level,this._myProject.achieve,application.customer.prop);
    }
   
	private buyAchieveUseGold(){
        let self = this;

        let p = self._project.goldPriceOfAchieve(self._myProject.achieve + 1);
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(p, 0, newOutput - oldOutput, self._myProject, function(succeed, c){
					if (!succeed) {
						Toast.launch("获得成就失败");    
					} else {
					    self.parent.removeChild(self);
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});
	}
	
	private buyAchieveUseDiamond(){
        let self = this;

        let p = self._project.diamondPriceOfAchieve(self._myProject.achieve + 1);
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(0, p, newOutput - oldOutput, self._myProject, function(succeed, c){
					if (!succeed) {
						Toast.launch("获得成就失败");    
					} else {
                        self.parent.removeChild(self);
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});
	}	
}