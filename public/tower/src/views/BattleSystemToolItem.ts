class BattleSystemToolItem extends BattleToolItem {
    public constructor(tool:any) {
        super(tool);
		
		this._ticks = 15;
		
		this._maxTicks = 15;
		let skill = Skill.get("Fireball", 0);
		if (skill) {
			if (skill.attrs.level == 1) {
				this._maxTicks -= 5;
			}

			if (skill.attrs.level == 3) {
				this._maxTicks -= 5;
			}
		}
    }
	
	protected onRefresh() {
		if (this._tool.category == "soldier") {
        	this.imgTool.source = "soldier_png";
		} else {
			this.imgTool.source = "fireball_png";
		}

        this.lblCount.visible = false;
	}
    
    public use(x: number, y: number) {
        if (this._tool.category == "soldier") {
			this._addReinforce(x, y, x - 10, y - 10);
			this._addReinforce(x, y, x + 10, y + 10);
        } else {
			let bulletClaz = "Fireball";
			let skill = Skill.get("Fireball", 0);			
			if (skill) {
				if (skill.attrs.level == 5) {
					let entrances = application.battle.getEntrances();
					for(let i = 0; i < entrances.length(); i++) {
						Bullet.throw(entrances[i][0], entrances[i][1] - 200, entrances[i][0], entrances[i][1], bulletClaz);
					}
				} else if (skill.attrs.level == 3) {
					Bullet.throw(x + 10, y - 200, x + 10, y, bulletClaz);
					Bullet.throw(x, y - 200, x, y, bulletClaz);
				} else {
					Bullet.throw(x, y - 200, x, y, bulletClaz);
				}
			} else {
				Bullet.throw(x, y - 200, x, y, bulletClaz);
			}
        }
        
        this._ticks = 0;
    }
	
	private _addReinforce(x: number, y: number, guradX: number, guardY: number) {
		let soldier = <Soldier>application.pool.get("Reinforce", {guardX: guradX, guardY: guardY});
		soldier.stand(x, y);
		application.battle.addSoldier(soldier);
	}
}
