class FirstChargeBonusUI extends eui.Component{
    private btnCancel:eui.Button;
    private btnCharge:eui.Button;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.charge();	
        },this);        
    }
}