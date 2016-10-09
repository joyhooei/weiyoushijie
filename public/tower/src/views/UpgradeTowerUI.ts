class UpgradeTowerUI extends AbstractUI{
    private _base: Base;
	private _tower: Tower;

	private _nextLevelTower: Tower;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;
    public imgUpgrade: eui.Image;
    public lblUpgraePrice:eui.Label;

	public imgFlag: eui.Image;

    constructor(base: Base) {
        super("upgradeTowerUISkin");
        
        this._base = base;
		this._tower = base.getTower();
		
		let claz = this._tower.getNextLevelTowerClaz();
		if (claz) {
			this._nextLevelTower = <Tower>application.pool.get(claz);
		} else {
			this._nextLevelTower = null;
		}
		
		if (this._tower.getSuperClaz() == "SoldierTower") {
			this.imgFlag.visible = true;
			
			let soldierTower = <SoldierTower>this._tower;
			
			this.imgFlag.x = soldierTower.getGuardX() - this.imgFlag.height;
			this.imgFlag.y = soldierTower.getGuardY() - this.imgFlag.width / 2;
			
			if (this._nextLevelTower) {
				this._nextLevelTower.guardAt(soldierTower.getGuardX(), soldierTower.getGuardY());
			}
		} else {
			this.imgFlag.visible = false;
		}
		        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) => {
			if (this.imgFlag.visible) {
    	        let x = Math.round(e.localX);
                let y = Math.round(e.localY);
			
				this.imgFlag.x = x - this.imgFlag.height;
				this.imgFlag.y = y - this.imgFlag.width / 2;
				
				let soldierTower = <SoldierTower>this._tower;
			
				if (x != soldierTower.getGuardX() || y != soldierTower.getGuardY()) {
					soldierTower.guardAt(x, y);
					if (this._nextLevelTower) {
						this._nextLevelTower.guardAt(x, y);
					}
				}

			} else {
				application.hideUI(this);
			}
		}, this);
		
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
		
		this.lblUpgraePrice.text = this._tower.getSellPrice().toString();
    }
}
