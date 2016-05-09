class AuctionUI extends eui.Component{
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }

    private uiCompHandler():void {

    }
    
    private btnClose:eui.Button;
}