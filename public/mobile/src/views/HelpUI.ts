class HelpUI extends eui.Component{
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/helpUISkin.exml";
    }

    private uiCompHandler():void {
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
    }
    
    private imgBack:eui.Image;
}