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
	        application.battle.incGolds(Math.round(this._base.getTower().getPrice() * 0.8));
			
			this._base.setTower(null);

	        application.hideUI(this);
		}, this);
		
		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
	        application.battle.incGolds(this._nextLevelTower.getPrice());
			
			this._base.setTower(this._nextLevelTower);

	        application.hideUI(this);
		}, this);
    }
    
    protected _onRefresh() {
		this.imgUpgrade.addChild(this._nextLevelTower.snapshot());
		this.lblUpgradePrice.text   = this._nextLevelTower.getPrice();
		this.lblSellPrice.text = Math.round(this._base.getTower().getPrice() * 0.8);
    }
}
