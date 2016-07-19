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
        this.lblRatio.text = Utility.format(project.achieve(achieve).outputRatio);
        this.lblLevel.text = project.achieve(achieve).level.toString();
        
        this.lblGold.touchEnabled = false;
        this.lblDiamond.touchEnabled = false;
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        //如果当前级别小于成就所需要的级别，则不能购买
        //如果上一个成就还没有解锁，则不能购买
        //如果已经购买了，也不能购买
        if(this._myProject.level < this._project.achieve(this._achieve).level 
            || this._achieve > this._myProject.achieve + 1
            || this._achieve <= this._myProject.achieve) {
            this.imgBuyUseGold.source = "";
            this.imgBuyUseDiamond.source = "";   
            this.lblGold.text = "";
            this.lblDiamond.text = "";
        } else {
            let priceUseGold = this._project.achieve(this._achieve).priceUseGold;
            this.lblGold.text = Utility.format(priceUseGold);

            let priceUseDiamond = this._project.achieve(this._achieve).priceUseDiamond;
            this.lblDiamond.text = priceUseDiamond;

            if(application.customer.usableGold() < priceUseGold) {
                this.imgBuyUseGold.source = "buttoncoinno_png";
                
                this.imgBuyUseGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                    application.showUI(new BuyToolUI( "time", 500), this);
    			}, this );
    		} else {
                this.imgBuyUseGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
    				this._buy(priceUseGold, 0);
    			}, this );
    		}

            if(application.customer.attrs.diamond < priceUseDiamond) {
                this.imgBuyUseDiamond.source = "buttondiano_png";
                
                this.imgBuyUseDiamond.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                    application.showUI(new ChargeTipUI(), this);
    			}, this );                
    		} else {
                this.imgBuyUseDiamond.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                    this._buy(0, priceUseDiamond);
                    
                    application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了成就", priceUseDiamond); 
    			}, this );
    		}
    	}
    }
    
    private _buy(gold:number, diamond:number): void {
        let newOutput = this._project.output(this._myProject.level,this._achieve,this._myProject.tool_ratio) 
        let oldOutput = this._project.output(this._myProject.level,this._myProject.achieve,this._myProject.tool_ratio);							

        this._myProject.achieve = this._achieve;
		application.customer.buyOutput(gold, diamond, newOutput - oldOutput);
        Toast.launch("获得成就成功");

        application.dao.save("Project",this._myProject);
        application.hideUI(this);

    }
}
