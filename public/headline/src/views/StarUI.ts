/**
 *
 * @author 
 *
 */
class StarUI extends AbstractUI {
    private imgBack: eui.Image;

	public constructor() {
    	  super("starUISkin");

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this);
  	
	}
	
	protected onRefresh() {
	    
	}
}
