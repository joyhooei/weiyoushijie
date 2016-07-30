class OfflineGoldUI extends eui.Component{
    private lblGold:eui.Label;
    private lblHour: eui.Label;
    private lblMinute: eui.Label;
    
    private imgOK: eui.Image;
    
    constructor() {
        super();
        
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
		
        this.lblGold.text   = Utility.format(application.me.attrs.offline_gold);
        this.lblHour.text   = application.me.attrs.offline_hours; 
        this.lblMinute.text = application.me.attrs.offline_minutes;
        
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.me.earnOfflineGold();
            
            application.hideUI(this);
        }, this );	
        
    }
}
