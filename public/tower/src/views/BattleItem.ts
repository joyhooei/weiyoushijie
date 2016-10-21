class BattleItem extends AbstractUI {
    private _stage: number;
    
    private _locked: boolean;
    
    public imgLock: eui.Image;
	public imgBattle: eui.Image;

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
		this.imgBattle.source = "map_" + this._stage.toString() +  "_png";
		
		this.imgLock.visible = this._locked;
		this.imgLock.x = this.imgBattle.x + (this.imgBattle.width - this.imgLock.width) / 2;
		this.imgLock.y = this.imgBattle.y + (this.imgBattle.height - this.imgLock.height) / 2;
	}
    
    public unlock() {
        if (this._locked) {
            this._locked = false;
            this.refresh();
        }
    }
}
