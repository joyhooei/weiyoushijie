class BuyAchieveUI extends eui.Component{
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }

    private uiCompHandler():void {
        this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.dispatchEventWith( GameEvents.EVT_RETURN );
        }, this );
    }
    
    private btnClose:eui.Button;
}