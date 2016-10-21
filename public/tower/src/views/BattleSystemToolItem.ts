class BattleSystemToolItem extends BattleToolItem {
    public constructor(tool:any) {
        super(tool);
		
		this._maxTicks = 15;
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
        	Bullet.shoot(x, y - 200, x, y, "Fireball");
        }
        
        this._ticks = 0;
    }
	
	private _addReinforce(x: number, y: number, guradX: number, guardY: number) {
		let soldier = <Soldier>application.pool.get("Reinforce", {guardX: guradX, guardY: guardY});
		soldier.setCenterX(x);
		soldier.setBottomY(y);
		application.battle.addSoldier(soldier);
	}
}
