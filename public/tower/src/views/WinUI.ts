class WinUI extends AbstractUI{
    private imgBack:eui.Button;
	
    private imgHide:eui.Image;
	private imgAvatar:eui.Image;

    constructor(bid: any) {
        super("winUISkin");

        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
			Bid.earn(application.me);
			
            this.hide();
        }, this);
        
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (application.me.attrs.hide_winner == 1) {
            	application.me.attrs.hide_winner = 0;
			} else {
				application.me.attrs.hide_winner = 1;
			}
			
			this.refresh();
        }, this);
    }
	
    protected onRefresh(): void {
		if (application.me.attrs.hide_winner == 1) {
			this.imgHide.source = "hidecancel_png";
			
			this.imgAvatar.source = "Ahide_png"
		} else {
			this.imgHide.source = "Awinhide_png";
			
            this.imgAvatar.source = Customer.avatarUrl(application.me.attrs);
		}
	}
}
