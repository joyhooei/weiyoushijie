class OfflineGoldUI extends eui.Component{
    private lblGold:eui.Label;
    private lblHour: eui.Label;
    private lblMinute: eui.Label;
    
    private imgOK: eui.Image;
    
    constructor(gold: number, hour: string, minute: string) {
        super();
        
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
		
        this.lblGold.text   = application.format(gold);
        this.lblHour.text   = hour; 
        this.lblMinute.text = minute;
        
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.customer.gold += gold;
            application.dao.save("Customer",application.customer,null);
			
            application.back(this);

            application.refreshCustomer(gold, 0, 0, 0, null);
        }, this );	
        
    }
}