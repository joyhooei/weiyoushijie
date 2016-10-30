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

			this._render((this.width >> 1) - 40, 0,  "soldiertower1_png",  "SoldierTower1", properties);
			this._render((this.width >> 1) - 40, 120, "magictower1_png", 	"MagicTower1",   properties);
			this._render(0, (this.height >> 1) - 35,  "arrowtower1_png", 	"ArrowTower1",   properties);
			this._render(120, (this.height >> 1) - 35, "bombtower1_png",  	"BombTower1",    properties);

		} else {
			this.imgFlag.visible = this._tower.getSuperClaz() == "SoldierTower";
		
			TowerItem.createSellItem(this, (this.width >> 1) - 40, 120, this._base);

			if (this._tower.upgradable()) {
				//升级塔
				let claz = this._tower.getClaz();
				let idx = parseInt(claz.charAt(claz.length - 1)) + 1;

				let path:string = "";
				switch(this._tower.getSuperClaz()) {
					case "MagicTower":
						path = "magictower" + idx + "_png";
						break;
					
					case "ArrowTower":
						path = "arrowtower" + idx + "_png";
						break;
						
					case "BombTower":
						path = "bombtower" + idx + "_png";
						break;

					case "SoldierTower":
						path = "soldiertower" + idx + "_png";
						break;				
				}

				if (this._tower.getClaz() == "ArrowTower3") {
					this._render(10, 20, path, claz.slice(0, claz.length - 1) + idx.toString(), properties);
					this._render(110, 20, "arrowtower5_png", claz.slice(0, claz.length - 1) + (idx + 1).toString(), properties);
				} else {
					this._render((this.width >> 1) - 40, 0, path, claz.slice(0, claz.length - 1) + idx.toString(), properties); 
				}
			} else {
				//升级技能
				let skill1Path:string = "";
				let skill2Path:string = "";
				switch(this._tower.getClaz()) {
					case "MagicTower4":
						skill1Path = "magictower1_png";
						skill2Path = "magictower2_png";
						break;
					
					case "ArrowTower4":
						skill1Path = "arrowtower1_png";
						skill2Path = "arrowtower2_png";
						break;
					
					case "ArrowTower5":
						skill1Path = "arrowtower1_png";
						skill2Path = "arrowtower2_png";
						break;
						
					case "BombTower4":
						skill1Path = "bombtower1_png";
						skill2Path = "bombtower2_png";
						break;
				}

				if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(2)) {
					this._renderSkill(10, 20, skill1Path, 1);
					this._renderSkill(110, 20, skill2Path, 2);
				} else if (this._tower.skillUpgradable(1)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill1Path, 1);
				} else if (this._tower.skillUpgradable(2)) {
					this._renderSkill((this.width >> 1) - 40, 0, skill2Path, 2);
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
		if (application.battle.getGolds() >= tower.getPrice()) {
			this._base.setTower(tower);
			this.hide();
		} else {
			Toast.launch("需要更多的金币");
		}
	}

	private _upgradeSkill(skill: number) {
        if (application.battle.getGolds() >= this._tower.getSkillUpgradePrice(skill)) {
            this._tower.upgradeSkill(skill);
			this.hide();
        } else {
            Toast.launch("需要更多的金币");
        }
	}
}
