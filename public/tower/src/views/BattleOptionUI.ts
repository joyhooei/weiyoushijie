class BattleOptionUI extends AbstractUI {
    public imgStart:  eui.Image;
    public imgQuit: eui.Image;
    
    public imgResult: eui.Image;

	private _result: Result;
    
    constructor(cbStart:Function, cbQuit:Function) {
        super("battleOptionUISkin");
        
		this._result = application.battle.getResult();
		this.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    cbStart();
		    
		    application.hideUI(this);
		}, this);
		
		this.imgQuit.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    cbQuit();
		    
		    application.hideUI(this);
		}, this);
    }

	protected onRefresh() {
        if (this._result.attrs.result == 1) {
        	this.imgResult.source = "end_win_png";
        } else {
        	this.imgResult.source = "end_defeat_png";
        }
	}
}
