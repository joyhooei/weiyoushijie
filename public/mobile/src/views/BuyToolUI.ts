class BuyToolUI extends eui.Component{
    private imgBack:eui.Image;
    private imgBuy: eui.Image;
    
    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
    private lblDescription: eui.Label;
    private lblDiamond: eui.Label;    
	
    private _name: string;
	private _price: number;
    
    constructor(name:string, price: number) {
        super();
		
        this._name = name;
		this._price = price;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/buyToolUISkin.exml";
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);;
        }, this );
        
        if (application.customer.diamond < this._price) {
            this.imgBuy.source = "buttoncoinno_png";
		} else {
            this.imgBuy.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
				if (this._name == "time") {
					this.buyTime();
				} else {
					this.buyHit();
				}
			}, this );
		}
		
        if(this._name == "time") {
            this.imgIcon.source = "time_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (application.format(application.customer.output * 3600 * 48)).toString() + "金币";
        } else {
            this.imgIcon.source = "Hit_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (3 - application.customer.total_hits).toString() + "暴击";
        }
        
        this.lblDiamond.text = this._price.toString();
    }
	
	private buyTime(){
    	var self = this;
    	
        application.customer.diamond -= this._price;
		application.customer.gold += application.customer.output * 3600 * 48;
		application.dao.save("Customer", application.customer, function(succeed, data){
			Toast.launch("购买了时光沙漏");

			application.refreshCustomer(application.customer.output * 3600 * 48, -500, 0, 0, null);
			
            application.hideUI(self);
		});
	}
	
	private buyHit() {
        var self = this;
        
        application.customer.diamond -= this._price;
		application.customer.total_hits = 3;
		application.dao.save("Customer", application.customer, function(succeed, data){
			Toast.launch("购买了爆击");

			application.refreshCustomer(0, -100, 3, 0, null);
			
            application.hideUI(self);
		});
	}
}