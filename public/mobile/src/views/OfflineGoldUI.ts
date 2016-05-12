class OfflineGoldUI extends eui.Component{
    private lblGold:eui.Label;
    private lblHour: eui.Label;
    private lblMinute: eui.Label;
    
    private imgOK: eui.Image;
    
    private gold: number;
    
    constructor(gold: number, hour: string, minute: string) {
        super();
        
        this.gold = gold;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
		
        this.lblGold.text = application.format(gold);
        this.lblHour.text = hour; 
        this.lblMinute.text = minute;
    }

    private uiCompHandler():void {
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.customer.gold += this.gold;
            application.dao.save("Customer",application.customer,null);

            application.main.homeUI.animateCustomer(this.gold,0,0,null);
             
            this.parent.removeChild(this);
        }, this );	
    }
}