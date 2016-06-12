class WinUI extends eui.Component{
    private imgBack:eui.Button;
	
    private imgHide:eui.Image;
	private imgAvatar:eui.Image;

    constructor(bid: any) {
        super();
        
        this.skinName = "resource/custom_skins/winUISkin.exml";
        
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
			application.earnBids();			
			application.earnOfflineGold();
            application.hideUI(this);
        }, this);
        
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (application.customer.hide_winner == 1) {
            	application.customer.hide_winner = 0;
			} else {
				application.customer.hide_winner = 1;
			}
			
			this.renderAvatar();
        },this);
		
		this.renderAvatar();
    }
	
    private renderAvatar(): void {
		if (application.customer.hide_winner == 1) {
			this.imgHide.source = "hidecancel_png";
			
			this.imgAvatar.source = "Ahide_png"
		} else {
			this.imgHide.source = "Awinhide_png";
			
            this.imgAvatar.source = application.avatarUrl(application.customer);
		}
	}
}