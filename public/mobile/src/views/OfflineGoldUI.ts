class OfflineGoldUI extends eui.Component{
    private lblGold:eui.Label;
    private lblTime: eui.Label;
    
    private imgOK: eui.Image;
    
    constructor(gold: number, time: string) {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
		
		lblGold.text = application.format(gold);
		lblTime.text = time;
    }

    private uiCompHandler():void {
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );	
    }
}