class BattleItem extends AbstractUI {
    private _stage: number;
    
    private _locked: boolean;
    
    public imgLock: eui.Image;
	public imgBg: eui.Image;
	public rcCover: eui.Rect;

    public constructor(stage:number) {
        super("battleItemSkin");
        
        this._stage = stage;
        this._locked = true;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            if (!this._locked) {
                this.show(new BattleLoadingUI(this._stage));
            }
		}, this);
    }

	protected onRefresh() {
		this.imgBg.source = "map_" + this._stage.toString() +  "_png";
		
		this.imgLock.visible = this._locked;
		this.imgLock.x = this.imgBg.x + (this.imgBg.width - this.imgLock.width) / 2;
		this.imgLock.y = this.imgBg.y + (this.imgBg.height - this.imgLock.height) / 2l
		
		if (this._locked) {
			this.rcCover.width  = this.imgBg.width;
			this.rcCover.height = this.imgBg.height;
			this.rcCover.visible = true;
		} else {
			this.rcCover.visible = false;
		}
	}
    
    public unlock() {
        if (this._locked) {
            this._locked = false;
            this.refresh();
        }
    }
}
