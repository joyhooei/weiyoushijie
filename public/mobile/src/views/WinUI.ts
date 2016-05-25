class WinUI extends eui.Component{
    private btnCancel:eui.Button;
	
    private imgHide:eui.Image;
	private imgAvatar:eui.Image;

    constructor() {
        super();
        
        this.skinName = "resource/custom_skins/winUISkin.exml";
        
        this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (application.customer.hide_winner == 1) {
            	application.customer.hide_winner = 0;
			} else {
				application.customer.hide_winner = 1;
			}
			
			this.renderAvatar();
			
			application.dao.save("Customer", application.customer);
        },this);
		
		this.renderAvatar();
    }
	
	private renderAvatar(): void {
		if (application.customer.hide_winner == 1) {
			this.imgHide.source == "hidecancel_png";
			
			this.imgAvatar.source = "Ahide_png"
		} else {
			this.imgHide.source == "Awinhide_png";
			
			this.imgAvatar.source = application.customer.avatar;
		}
	}
}