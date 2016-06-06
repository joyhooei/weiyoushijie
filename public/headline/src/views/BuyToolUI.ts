class BuyToolUI extends eui.Component{
    private imgBack:eui.Image;
    private imgBuy: eui.Image;
    
    private imgIcon: eui.Image;

    private lblPrice: eui.Label;   
	
	private lblGold: eui.Label;
	
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
		
		this.imgBuy.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
			this.buy();
		}, this );
		
		this.lblGold.text = "";
        if(this._name == "time") {
            this.imgIcon.source = "timeh_png";
			this.lblGold.text = application.format(application.customer.output * 3600 * 48);
        } else if (this._name == "hit") {
            this.imgIcon.source = "hith_png";
        } else if (this._name == "ticket") {
            this.imgIcon.source = "ticketh_png";
        } else if (this._name == "vip") {
            this.imgIcon.source = "VIPh_png";
        } 
        		
		if (this._name == "time" || this._name == "hit") {
			if (application.customer.diamond < this._price) {
				this.imgBuy.source = "buttondiano_png";
			} else {
				this.imgBuy.source = "buttondia_png";
			}
			
            this.lblPrice.text = this._price.toString();
		} else {
            this.imgBuy.source = "topupbutton_png";
			
            this.lblPrice.text = "";
		}
    }
	
	private buy() {
		if (this._name == "time") {
			this.buyTime();
		} else if (this._name == "hit") {
			this.buyHit();
		} else if (this._name == "ticket") {
			this.buyTicket();
		} else if (this._name == "vip") { 
			this.buyVIP();
		}	
	}
	
	private buyTime(){
		if (application.customer.diamond > this._price) {
			application.customer.diamond -= this._price;
			
			var gold = application.customer.output * 3600 * 48;
			application.customer.gold += gold;
			application.customer.accumulated_gold += gold;
			
            application.saveCustomer();
            
            Toast.launch("购买了时光沙漏");

            application.hideUI(this);            
		} else {
			application.showUI(new ChargeTipUI());
		}
	}
	
	private buyHit() {
        if (application.customer.total_hits == 0) {
			if (application.customer.diamond > this._price) {
				application.customer.diamond -= this._price;
				application.customer.total_hits = 3;				
                application.saveCustomer();
                
                Toast.launch("购买了暴击");

                application.hideUI(this);
			} else {
				application.showUI(new ChargeTipUI());
			}
		} else {
			Toast.launch("你还有" + application.customer.total_hits + "个暴击，请用完后再购买");
		}
	}
    
	//月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    private buyTicket() {
		var ticketDay = application.ticketDay();
		if (ticketDay >= 0) {
			application.hideUI(this);
			
			application.buyTicket();
		} else {
			Toast.launch("你已经购买了VIP，不需要购买月票");
		}
    }
    
	//终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    private buyVIP() {
		var ticketDay = application.ticketDay();
		if (ticketDay >= 0) {
			application.hideUI(this);
			
			application.buyVIP();
		} else {
			Toast.launch("你已经购买了VIP，终身免费");
		}			
    }    
}