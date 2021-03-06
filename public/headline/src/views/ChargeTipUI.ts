class ChargeTipUI extends eui.Component{
    private imgBack: eui.Image;
	
    private imgCharge1:eui.Image;
    private imgCharge2:eui.Image;
    private imgCharge3:eui.Image;
    private imgCharge4:eui.Image;
    private imgCharge5:eui.Image;
    private imgCharge6:eui.Image;
    private imgCharge7:eui.Image;
    private imgCharge8:eui.Image;

    constructor() {
        super();
		
        this.skinName = "resource/custom_skins/chargeTipUISkin.exml";
		
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        this.imgCharge1.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me,'diamond', 2);
        },this);
        
        this.imgCharge2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me,'diamond600', 5);
        },this);
        
        this.imgCharge3.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me,'diamond1300', 10);
        },this);
        
        this.imgCharge4.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me,'diamond4500', 30);
        },this);
        
        this.imgCharge5.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me,'diamond18000', 100);
        },this);
        
        this.imgCharge6.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            Order.charge(application.me, 'diamond100000', 500);
        },this);
        
        this.imgCharge7.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            if (application.me.attrs.vip == 2) {
			    Toast.launch("你已经购买了VIP，终身免费，不需要购买月票");
		    } else {
            	Order.buyTicket(application.me);
			}
        },this);
        
        this.imgCharge8.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (application.me.attrs.vip == 2) {
				Toast.launch("你已经购买了VIP，终身免费");
			} else {
				Order.buyVIP(application.me);
			}
        },this);
    }
}
