class FirstChargeBonusUI extends eui.Component{
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
    }

    private uiCompHandler():void {
        this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
        },this);        
    }
    
    private btnCancel:eui.Button;
    private btnCharge:eui.Button;
}