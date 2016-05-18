class FirstChargeBonusUI extends eui.Component{
    private btnCancel:eui.Button;
    private btnCharge:eui.Button;

    constructor() {
        super();
        
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
        
        this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.back(this);
        }, this );
        
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge();	
        },this);
    }
}