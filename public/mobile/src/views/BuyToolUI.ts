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
				} else if (this._name == "hit") {
					this.buyHit();
				} else if (this._name == "ticket") {
                    this.buyTicket();
                } else if (this._name == "vip") { 
                    this.buyVIP();
                }
			}, this );
		}
		
        if(this._name == "time") {
            this.imgIcon.source = "time_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (application.format(application.customer.output * 3600 * 48)).toString() + "金币";
        } else if (this._name == "hit") {
            this.imgIcon.source = "Hit_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (3 - application.customer.total_hits).toString() + "暴击";
        } else if (this._name == "ticket") {
            this.imgIcon.source = "Hit_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (3 - application.customer.total_hits).toString() + "暴击";
        } else if (this._name == "vip") {
            this.imgIcon.source = "Hit_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (3 - application.customer.total_hits).toString() + "暴击";
        } 
        
        this.lblDiamond.text = this._price.toString();
    }
	
	private buyTime(){
    	var self = this;
    	
		if (application.customer.diamond > this._price) {
			application.customer.diamond -= this._price;
			application.customer.gold += application.customer.output * 3600 * 48;
			application.dao.save("Customer", application.customer, function(succeed, data){
				Toast.launch("购买了时光沙漏");

				application.refreshCustomer(application.customer.output * 3600 * 48, -500, 0, 0, null);

				application.hideUI(self);
			});
		} else {
			//TBD
		}
	}
	
	private buyHit() {
        var self = this;
        
		if (application.customer.diamond > this._price) {
			application.customer.diamond -= this._price;
			application.customer.total_hits = 3;
			application.dao.save("Customer", application.customer, function(succeed, data){
				Toast.launch("购买了爆击");

				application.refreshCustomer(0, -100, 3, 0, null);

				application.hideUI(self);
			});
		} else {
			//TBD
		}
	}
    
	//月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    private buyTicket() {
		var self = this;
		
        var order = { customer_id: application.customer.id, product: "ticket", price: this._price};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				application.pay("1", o, function(succeed){
					if (succeed == 1) {
						Toast.launch("购买了月票");
					}
				});
            } else {
                Toast.launch("购买失败");
            }
        });
    }
    
	//终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    private buyVIP() {
        var self = this;
        
        var order = { customer_id: application.customer.id, product: "vip", price: this._price};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				application.pay("2", o, function(succeed){
					if (succeed == 1) {
						Toast.launch("购买了终身VIP");
					}
				});			
            } else {
                Toast.launch("购买失败");
            }
        });
    }    
}