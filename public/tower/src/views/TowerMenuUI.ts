class TowerMenuUI extends AbstractUI{
    private _base: Base;

	private _tower: Tower;

	public imgFlag: eui.Image;
    
    constructor(base: Base) {
        super("towerMenuUISkin");
        
        this._base = base;
		this._tower = this._base.getTower();

		this.imgFlag.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			(<SoldierTower>this._tower).showFlag();

	        this.hide();
		}, this);
    }
    
    protected onRefresh() {
		let properties = {guardX: this._base.getGuardX(), guardY: this._base.getGuardY()};
		if (!this._tower) {
			//新建塔
			this.imgFlag.visible = false;

			this._render((this.width >> 1) - 40, 0,    "soldiertower1_png",  "SoldierTower1", properties);
			this._render((this.width >> 1) - 40, 120,  "magictower1_png", 	 "MagicTower1",   properties);
			this._render(0, (this.height >> 1) - 35,   "arrowtower1_png", 	 "ArrowTower1",   properties);
			this._render(120, (this.height >> 1) - 35, "bombtower1_png",  	 "BombTower1",    properties);
		} else {
			this.imgFlag.visible = this._tower.getSuperClaz() == "SoldierTower";
		
			TowerItem.createSellItem(this, (this.width >> 1) - 40, 120, this._base);

			if (this._tower.upgradable()) {
				//升级塔
				let path = this._getIconPath(this._tower, 1);
				let claz = this._tower.getClaz();
				let idx = parseInt(claz.charAt(claz.length - 1)) + 1;
				let superClaz = claz.slice(0, claz.length - 1);
				if (this._tower.getClaz() == "ArrowTower3") {
					this._render(10, 20, path, superClaz + idx.toString(), properties);
					this._render(110, 20, "arrowtower5_png", superClaz + (idx + 1).toString(), properties);
				} else {
					this._render((this.width >> 1) - 40, 0, path, superClaz + idx.toString(), properties); 
				}
			} else {
				//升级技能
				let skill1Path:string = this._getSkillIconPath(this._tower, 1);
				let skill2Path:string = this._getSkillIconPath(this._tower, 2);
				let skill3Path:string = this._getSkillIconPath(this._tower, 3);
				if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(2) && this._tower.skillUpgradable(3)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill1Path, 1);
					this._renderSkill(10,  40, skill2Path, 2);
					this._renderSkill(110, 40, skill3Path, 3);
				} else if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(2)) {
					this._renderSkill(10,  20, skill1Path, 1);
					this._renderSkill(110, 20, skill2Path, 2);
				} else if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(3)) {
					this._renderSkill(10,  20, skill1Path, 1);
					this._renderSkill(110, 20, skill3Path, 3);
				} else if (this._tower.skillUpgradable(3) && this._tower.skillUpgradable(2)) {
					this._renderSkill(10,  20, skill2Path, 2);
					this._renderSkill(110, 20, skill3Path, 3);
				} else if (this._tower.skillUpgradable(1)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill1Path, 1);
				} else if (this._tower.skillUpgradable(2)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill2Path, 2);
				} else if (this._tower.skillUpgradable(3)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill3Path, 3);
				}
			}
		}
    }

	private _renderSkill(x: number, y: number, res:string, skill:number) {
		let towerItem = TowerItem.createItem(this, x, y, res, this._tower.getSkillUpgradePrice(skill));
		towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeSkill(skill);
		}, this);	
	}

	private _render(x: number, y: number, res:string, claz:string, properties:any) {
		let tower = <Tower>application.pool.get(claz, properties);
		let towerItem = TowerItem.createItem(this, x, y, res, tower.getPrice());
		towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    this._build(tower);
		}, this);
	}

	private _build(tower: Tower) {
		let self = this;
		self.show(new OptionUI(self._getIconPath(self._tower, 0), self._getDescription(self._tower, 0), function(){
			let price = tower.getPrice();
			if (application.battle.getGolds() >= price) {
				application.battle.incGolds(-price);
				self._base.setTower(tower);		
				self.hide();
			} else {
				Toast.launch("需要更多的金币");
			}
		}
	}

	private _upgradeSkill(skill: number) {
		let self = this;
		self.show(new OptionUI(self._getSkillIconPath(self._tower, skill), self._getSkillDescription(self._tower, skill), function(){
			let price = self._tower.getSkillUpgradePrice(skill);
			if (application.battle.getGolds() >= price) {
				application.battle.incGolds(-price);
				self._tower.upgradeSkill(skill);

				application.battle.unselect(self._tower);
				self.hide();
			} else {
				Toast.launch("需要更多的金币");
			}
		});
	}

	private _getIconPath(tower: Tower, levelDelta = 1):string {
		let claz = tower.getClaz();
		let idx = parseInt(claz.charAt(claz.length - 1)) + levelDelta;
		
		switch(tower.getSuperClaz()) {
			case "MagicTower":
				return "magictower" + idx + "_png";

			case "ArrowTower":
				return "arrowtower" + idx + "_png";

			case "BombTower":
				return "bombtower" + idx + "_png";

			case "SoldierTower":
				return "soldiertower" + idx + "_png";
		}
	}

	private _getDescription(tower: Tower):string {
		return "";
	}

	private _getSkillIconPath(tower: Tower, skill:number):string {
		switch(tower.getClaz()) {
			case "MagicTower4":
				if (skill == 1) {
					return "magictower4_skill1_png";
				} else if (skill == 2) {
					return "magictower4_skill2_png";
				} else {
					return null;
				}

			case "ArrowTower4":
				if (skill == 1) {
					return "arrowtower4_skill1_png";
				} else if (skill == 2) {
					return "arrowtower4_skill2_png";
				} else {
					return null;
				}				

			case "ArrowTower5":
				if (skill == 1) {
					return "arrowtower5_skill1_png";
				} else if (skill == 2) {
					return "arrowtower5_skill2_png";
				} else {
					return null;
				}					

			case "BombTower4":
				if (skill == 1) {
					return "bombtower4_skill1_png";
				} else if (skill == 2) {
					return "bombtower4_skill2_png";
				} else {
					return null;
				}					

			case "SoldierTower4":
				if (skill == 1) {
					return "soldiertower4_skill1_png";
				} else if (skill == 2) {
					return "soldiertower4_skill2_png";
				} else {
					return "soldiertower4_skill3_png";
				}
		}		
	}

	private _getSkillDescription(tower: Tower, skill:number):string {
		return "";
	}
}
