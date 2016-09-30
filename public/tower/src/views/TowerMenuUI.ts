class TowerMenuUI extends AbstractUI{
    private _base: Base;

	private _nextLevelTower: Tower;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;
    public imgUpgrade: eui.Image;
    public lblUpgraePrice:eui.Label;

    constructor(base: Base) {
        super("towerMenuUISkin");
        
        this._base = base;
		
		this._nextLevelTower = application.pools.get(this._base.getTower().getNextLevelTowerClaz());
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
		
		this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._base.setTower(null);

	        application.hideUI(this);
		}, this);
		
		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (application.battle.getGolds() > this._nextLevelTower.getPrice()) {
				this._base.setTower(this._nextLevelTower);

				application.hideUI(this);
			} else {
				Toast.launch("需要更多的金币");
			}
		}, this);
    }
    
    protected _onRefresh() {
		this.imgUpgrade.source = this._nextLevelTower.snapshot();
		this.lblUpgradePrice.text   = this._nextLevelTower.getPrice();
		
		this.lblSellPrice.text = this._base.getTower().getSellPrice();
    }
}
