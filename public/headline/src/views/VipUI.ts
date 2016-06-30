class VipUI extends eui.Component {
    private lblCharge: eui.Label;

    private imgCharge: eui.Image;
    private imgBack: eui.Image;
    
    private imgTitle: eui.Image;

    constructor() {
        super();

        this.skinName = "resource/custom_skins/vipUISkin.exml";

        if(application.vip.getLevel() > 0) {
            this.lblCharge.text = application.customer.charge;
        } else {
            this.lblCharge.visible = false;
        }
        this.imgTitle.source = "vt" + application.vip.getLevel() + "_png";

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this); 
        
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
            
            application.showUI(new ChargeTipUI());
        },this);

    }
}