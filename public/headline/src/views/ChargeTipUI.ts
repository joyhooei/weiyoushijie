class ChargeTipUI extends eui.Component{
    private imgCancel: eui.Image;
    private imgCharge:eui.Image;

    constructor() {
        super();
		
        this.skinName = "resource/custom_skins/chargeTipUISkin.exml";
		
        this.imgCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge();
        },this);        		
    }
}