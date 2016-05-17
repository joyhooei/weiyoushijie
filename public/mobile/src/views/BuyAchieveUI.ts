class BuyAchieveUI extends eui.Component{
    private btnBack:eui.Button;
    private btnBuyUseGold:eui.Button;
    private btnBuyUseDiamond:eui.Button;
    
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
        this.btnBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        let p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.gold < p) {
			this.btnBuyUseGold.enabled = false;
		} else {
			this.btnBuyUseGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
				this.buyAchieveUseGold();
			}, this );
		}

        let p = self._project.diamondPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.diamond < p) {
			this.btnBuyUseDiamond.enabled = false;
		} else {
			this.btnBuyUseDiamond.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
				this.buyAchieveUseDiamond();
			}, this );
		}
    }
    
	private buyAchieveUseGold(){
        let self = this;

        let p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(p, 0, newOutput - oldOutput, self._myProject, function(succeed, c){
					if (!succeed) {
						Toast.launch("获得成就失败");    
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});
	}
	
	private buyAchieveUseDiamond(){
        let self = this;

        let p = self._project.diamondPriceOfAchieve(self._myProject.acheve + 1);
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(0, p, newOutput - oldOutput, self._myProject, function(succeed, c){
					if (!succeed) {
						Toast.launch("获得成就失败");    
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});
	}	
}