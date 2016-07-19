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
		
        this.lblGold.touchEnabled = false;
        this.lblPrice.touchEnabled = false;
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
			this.lblGold.text = Utility.format(application.me.attrs.output * 3600 * 48);
        } else if (this._name == "hit") {
            this.imgIcon.source = "hith_png";
        } else if (this._name == "ticket") {
            this.imgIcon.source = "ticketh_png";
        } else if (this._name == "vip") {
            this.imgIcon.source = "VIPh_png";
        } 
        		
		if (this._name == "time" || this._name == "hit") {
			if (application.me.attrs.diamond < this._price) {
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
		if (application.me.attrs.diamond > this._price) {
			application.me.attrs.diamond -= this._price;
            application.me.earnGold(application.me.attrs.output * 3600 * 48);
			application.me.saveNow();
            
			application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了时光沙漏", this._price); 
			
            Toast.launch("购买了时光沙漏");

            application.hideUI(this);            
		} else {
			application.showUI(new ChargeTipUI());
		}
	}
	
	private buyHit() {
        if (application.me.attrs.total_hits == 0) {
			if (application.me.attrs.diamond > this._price) {
				application.me.attrs.diamond -= this._price;
				application.me.attrs.total_hits = 3;				
                application.me.saveNow();
				
				application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了暴击", this._price); 
                
                Toast.launch("购买了暴击");

                application.hideUI(this);
			} else {
				application.showUI(new ChargeTipUI());
			}
		} else {
			Toast.launch("你还有" + application.me.attrs.total_hits + "个暴击，请用完后再购买");
		}
	}
    
	//月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    private buyTicket() {
		if (application.me.attrs.vip == 2) {
			Toast.launch("你已经购买了VIP，终身免费，不需要购买月票");
		} else {
			Order.buyTicket(application.me);
			
			application.hideUI(this);
		}
    }
    
	//终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    private buyVIP() {
		if (application.me.attrs.vip == 2) {
			Toast.launch("你已经购买了VIP，终身免费");
		} else {
			Order.buyVIP(application.me);
			
			application.hideUI(this);
		}			
    }    
}
