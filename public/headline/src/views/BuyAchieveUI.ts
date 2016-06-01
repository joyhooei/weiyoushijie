class BuyAchieveUI extends eui.Component{
    private imgBack: eui.Image;
    
    private imgBuyUseGold:eui.Image;
    private imgBuyUseDiamond: eui.Image;
    
    private lblGold:eui.Label;
    private lblDiamond:eui.Label;
    
    private imgIcon:eui.Image;
    private imgProject:eui.Image;
    private lblRatio:eui.Label;
    private lblLevel:eui.Label;
    
    private _myProject: any;
    private _project: Project;
    private _achieve:number;
    
    constructor(myProject: any,project: Project, achieve:number) {
        super();
        
        this._myProject = myProject;
        this._project = project;
        this._achieve = achieve;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
        
        this.imgIcon.source = "b" + achieve.toString() + "_png";
        this.imgProject.source = "t" + (myProject.sequence + 1).toString() + "_png";
        this.lblRatio.text = application.format(project.achieve(achieve).outputRatio);
        this.lblLevel.text = application.format(project.achieve(achieve).level);
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        let priceUseGold = this._project.achieve(this._achieve).priceUseGold;
        this.lblGold.text = priceUseGold.toString();

        let priceUseDiamond = this._project.achieve(this._achieve).priceUseDiamond;
        this.lblDiamond.text = priceUseDiamond.toString();    
        
        //如果当前级别小于成就所需要的级别，则不能购买
        //如果上一个成就还没有解锁，则不能购买
        //如果已经购买了，也不能购买
        if(this._myProject.level < this._project.achieve(this._achieve).level 
            || this._achieve > this._myProject.achieve + 1
            || this._achieve <= this._myProject.achieve) {
            this.imgBuyUseGold.source = "buttoncoinno_png";
            this.imgBuyUseDiamond.source = "buttondiano_png";           
        } else {
            if(application.usableGold() < priceUseGold) {
                this.imgBuyUseGold.source = "buttoncoinno_png";
    		} else {
                this.imgBuyUseGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
    				this._buy(priceUseGold, 0);
    			}, this );
    		}

            if(application.customer.diamond < priceUseDiamond) {
                this.imgBuyUseDiamond.source = "buttondiano_png";
    		} else {
                this.imgBuyUseDiamond.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                    this._buy(0, priceUseDiamond);
    			}, this );
    		}
    	}
    }
    
    private _buy(gold:number, diamond:number): void {
        let self = this;

		self._myProject.achieve = self._achieve;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let delta = self._project.output(self._myProject.level,self._achieve,self._myProject.tool_ratio) 
								- self._project.output(self._myProject.level,self._myProject.achieve,self._myProject.tool_ratio);
								
				application.buyOutput(gold, diamond, delta, self._myProject, function(succeed, c){
					if (!succeed) {
						Toast.launch("获得成就失败");    
					} else {
                        application.hideUI(self);
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});    
    }
}