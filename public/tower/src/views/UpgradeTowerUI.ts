class UpgradeTowerUI extends AbstractUI{
    private _base: Base;
	private _tower: Tower;

	private _nextLevelTower1: Tower;
	private _nextLevelTower2: Tower;

	private imgBg: eui.Image;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;

    public imgUpgrade: eui.Image;
    public lblUpgradePrice:eui.Label;

    public imgUpgrade1: eui.Image;
    public lblUpgradePrice1:eui.Label;

    public imgUpgrade2: eui.Image;
    public lblUpgradePrice2:eui.Label;

	public imgFlag: eui.Image;

    constructor(base: Base) {
        super("upgradeTowerUISkin");
        
        this._base = base;
		this._tower = base.getTower();
		
		let claz = this._tower.getClaz();
		let idx = parseInt(claz.charAt(claz.length - 1));
		if (idx == 1 || idx == 2) {
			this._nextLevelTower1 = <Tower>application.pool.get(claz.slice(0, claz.length - 1) + (idx + 1).toString());
			this._nextLevelTower2 = null;
		} else if (idx == 3) {
			this._nextLevelTower1 = <Tower>application.pool.get(claz.slice(0, claz.length - 1) + "4");
			this._nextLevelTower2 = <Tower>application.pool.get(claz.slice(0, claz.length - 1) + "5");
		} else {
			this._nextLevelTower1 = null;
			this._nextLevelTower2 = null;
		}
		        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
			
		this.imgFlag.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			(<SoldierTower>this._tower).showFlag();

	        application.hideUI(this);
		}, this);
			
		this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._base.setTower(null);

	        application.hideUI(this);
		}, this);
		
		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeTo(this._nextLevelTower1);				
		}, this);
		
		this.imgUpgrade1.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeTo(this._nextLevelTower1);							
		}, this);
		
		this.imgUpgrade2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeTo(this._nextLevelTower2);				
		}, this);		
    }

	private _upgradeTo(tower: Tower) {
		if (tower) {
			if (application.battle.getGolds() > tower.getPrice()) {
				this._base.setTower(tower);

				application.hideUI(this);
			} else {
				Toast.launch("需要更多的金币");
			}
		} else {
			Toast.launch("已经是最高级了");
		}
	}

    protected onRefresh() {
		if (this._tower.getSuperClaz() == "SoldierTower") {
			this.imgFlag.visible = true;
		} else {
			this.imgFlag.visible = false;
		}

		if (this._nextLevelTower1) {
			if (this._nextLevelTower2) {
				this.imgBg.source = "towerselect3_png";
				
				this.lblUpgradePrice1.text   = this._tower.getUpgradePrice().toString();
				this.lblUpgradePrice2.text   = this._tower.getUpgradePrice().toString();
				
				this.lblUpgradePrice1.visible = true;
				this.lblUpgradePrice2.visible = true;
				this.imgUpgrade1.visible = true;
				this.imgUpgrade2.visible = true;
				this.lblUpgradePrice.visible = false;
				this.imgUpgrade.visible = false;
				
			} else {
				this.imgBg.source = "towerselect2_png";
				
				this.lblUpgradePrice.text   = this._tower.getUpgradePrice().toString();
				
				this.lblUpgradePrice1.visible = false;
				this.lblUpgradePrice2.visible = false;
				this.imgUpgrade1.visible = false;
				this.imgUpgrade2.visible = false;
				this.lblUpgradePrice.visible = true;
				this.imgUpgrade.visible = true;
			}
		} else {
			this.imgBg.source = "towerselect2_png";
				
			this.lblUpgradePrice1.visible = false;
			this.lblUpgradePrice2.visible = false;
			this.imgUpgrade1.visible = false;
			this.imgUpgrade2.visible = false;
			this.lblUpgradePrice.visible = false;
			this.imgUpgrade.visible = false;
		}
		
		this.lblSellPrice.text = this._tower.getSellPrice().toString();
    }
}
