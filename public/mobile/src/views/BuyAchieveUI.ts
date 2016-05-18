class BuyAchieveUI extends eui.Component{
    private imgBack: eui.Image;
    
    private imgBuyUseGold:eui.Image;
    private imgBuyUseDiamond: eui.Image;
    
    private lblGold:eui.Label;
    private lblDiamond:eui.Label;
    
    private imgIcon:eui.Image;
    private lblDescription:eui.Label;
    
    private _myProject: any;
    private _project: Project;
    
    constructor(myProject: any,project: Project, icon:string) {
        super();
        
        this._myProject = myProject;
        this._project = project;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
        
        this.imgIcon.source = icon;
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        let p = this._project.goldPriceOfAchieve(this._myProject.achieve + 1);
        this.lblGold.text = p.toString();
        if (application.usableGold() < p) {
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
        
        var delta = this.delta();
        var description = "获得成就将提高秒产" + delta.toString() + "个金币";
        this.lblDescription.text = description;
    }

    private delta(): number {
        return this._project.output(this._myProject.level,this._myProject.achieve + 1) -this._project.output(this._myProject.level,this._myProject.achieve);
    }
   
	private buyAchieveUseGold(){
        let self = this;

        let p = self._project.goldPriceOfAchieve(self._myProject.achieve + 1);
        let delta = self.delta();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				application.buyOutput(p, 0, delta, self._myProject, function(succeed, c){
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
        let delta = self.delta();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				application.buyOutput(0, p, delta, self._myProject, function(succeed, c){
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