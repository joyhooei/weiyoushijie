class ShootEnemy extends Enemy implements Shooter {
    protected _shootRadius: number;
	
    protected _bulletClaz: string;
	
    public constructor() {
        super();
		
		this._bulletClaz = "Arrow1"
    }
	
    public initialize(properties:any) {
        super.initialize(properties);
        
		this._shootRadius = this._get(properties, "shootRadius", 50);
    }
    
    public targetKilled(target:NPC) {
    }
    
    public getMuzzleX(): number {
        if (this._targetX > this.x) {
            return this.x + this.width;
        } else {
            return this.x;
        }
    }
    
    public getMuzzleY(): number {
        return this.y;
    }
    
    protected _moving() {
        let soldier = application.battle.findSuitableSoldier(this.getCenterX(), this.getCenterY(), this._shootRadius, [0, 1]);
        if (soldier) {
            this.addSoldier(soldier);
            this.fight();
        } else {
            super._moving();
        }
    }
    
    protected _hitOpponents() {
        let soldier = this.firstSoldier();
        if (soldier && soldier.active()) {
            Bullet.shoot(this, soldier, this._bulletClaz , {force: this.getForce()});
        } else {
            this.rmvSoldier(soldier);
        }
    }
}
