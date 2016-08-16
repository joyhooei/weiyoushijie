class BattleOptionUI extends AbstractUI {
    public imgStart:  eui.Image;
    public imgQuit: eui.Image;
    
    constructor(cbStart:Function, cbQuit:Function) {
        super("battleOptionUISkin");
        
		this.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    cbStart();
		    
		    application.hideUI(this);
		}, this);
		
		this.imgQuit.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    cbQuit();
		    
		    application.hideUI(this);
		}, this);
    }    
}
