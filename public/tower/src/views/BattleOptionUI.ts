class BattleOptionUI extends AbstractUI {
    public imgStart:  eui.Image;
    public imgQuit: eui.Image;
    
    public imgResult: eui.Image;
    
    constructor(cbStart:Function, cbQuit:Function) {
        super("battleOptionUISkin");
        
        if (application.battle.getLives() > 0) {
        	this.imgResult.source = "end_win_png";
        } else {
        	this.imgResult.source = "end_defeat_png";
        }
        
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
