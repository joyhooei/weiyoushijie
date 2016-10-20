class BattleItem extends AbstractUI {
    private _stage: number;
    
    private _locked: boolean;
    
    public imgLock: eui.Image;
	public imgBg: eui.Image;

    public constructor(stage:number, locked: boolean) {
        super("battleItemSkin");
        
        this._stage = stage;
        this._locked = locked;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            if (!this._locked) {
                this.show(new BattleLoadingUI(this._stage));
            }
		}, this);
    }

	protected onRefresh() {
		this.imgBg.source = "map_" + this._stage.toString() +  "_png";
		this.imgLock.visible = this._locked;
	}
    
    public unlock() {
        if (this._locked) {
            this._locked = false;
            this.refresh();
        }
    }
}
