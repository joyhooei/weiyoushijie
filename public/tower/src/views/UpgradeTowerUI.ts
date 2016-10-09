class UpgradeTowerUI extends AbstractUI{
    private _base: Base;

	private _nextLevelTower: Tower;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;
    public imgUpgrade: eui.Image;
    public lblUpgraePrice:eui.Label;

    constructor(base: Base) {
        super("upgradeTowerUISkin");
        
        this._base = base;
		
		let claz = this._base.getTower().getNextLevelTowerClaz();
		if (claz) {
			this._nextLevelTower = <Tower>application.pool.get(claz);
		} else {
			this._nextLevelTower = null;
		}
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
		
		this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._base.setTower(null);

	        application.hideUI(this);
		}, this);
		
		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._nextLevelTower) {
				if (application.battle.getGolds() > this._nextLevelTower.getPrice()) {
					this._base.setTower(this._nextLevelTower);

					application.hideUI(this);
				} else {
					Toast.launch("需要更多的金币");
				}
			} else {
				Toast.launch("已经是最高级了");
			}				
		}, this);
    }
    
    protected _onRefresh() {
		if (this._nextLevelTower) {
			this.lblUpgraePrice.text   = this._nextLevelTower.getPrice().toString();
		} else {
			this.lblUpgraePrice.text   = "";		
		}
		
		this.lblUpgraePrice.text = this._base.getTower().getSellPrice().toString();
    }
}
