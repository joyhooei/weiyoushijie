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
            application.charge(2);
        },this);
        
        this.imgCharge2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge(5);
        },this);
        
        this.imgCharge3.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge(10);
        },this);
        
        this.imgCharge4.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge(30);
        },this);
        
        this.imgCharge5.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge(100);
        },this);
        
        this.imgCharge6.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge(500);
        },this);
        
        this.imgCharge7.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.buyTicket();
        },this);
        
        this.imgCharge8.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.buyVIP();
        },this);
    }
}