class BlockUI extends AbstractUI {
	public rcBlock: eui.Rect;
	
    public constructor() {
        super('blockUISkin');
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
            for(let i = 0; i < this.numChildren; i++) {
                let child = this.getChildAt(i);

                if (child != this.rcBlock && child.hitTestPoint(event.stageX, event.stageY)) {
                    return;
                }
            }

		    application.hideUI(this);
		}, this);
    }
}
