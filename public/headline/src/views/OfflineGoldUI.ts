class OfflineGoldUI extends eui.Component{
    private lblGold:eui.Label;
    private lblHour: eui.Label;
    private lblMinute: eui.Label;
    
    private imgOK: eui.Image;
    
    constructor() {
        super();
        
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
		
        this.lblGold.text   = application.format(application.customer.offline_gold);
        this.lblHour.text   = application.customer.offline_hours; 
        this.lblMinute.text = application.customer.offline_minutes;
        
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.customer.gold += application.customer.offline_gold;
            application.customer.accumulated_gold += application.customer.offline_gold;
            application.customer.offline_gold = 0;
            application.customer.offline_minutes = 0;
            application.customer.offline_hours = 0;
            application.saveCustomer();
			
            application.hideUI(this);
        }, this );	
        
    }
}