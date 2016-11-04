class ShootEnemy extends Enemy implements Shooter {
    protected _shootRadius: number;
    
    public constructor() {
        super();
    }
     
    public initialize(properties:any) {
        super.initialize(properties);
        
		this._shootRadius = this._get(properties, "shootRadius", 50);
    }
    
    public targetKilled(target:NPC) {
    }
    
    public getMuzzleX(): number {
        it (this._target.x > this.x) {
            return this.x + this.width;
        } else {
            return this.x;
        }
    }
    
    public getMuzzleY(): number {
        return this.y;
    }
    
    protected _moving() {
        let soldier = this._findSoldier();
        if (soldier) {
            this.addSoldier(soldier);
            this.fight();
        } else {
            super._moving();
        }
    }
    
    protected _hitOpponents() {
        let soldier = this.application.battle.findSuitableSoldier(this.getCenterX(), this.getCenterY(), this._shootRadius);
        if (soldier && soldier.active()) {
            this._shoot(soldier);
        } else {
            this.rmvSoldier(soldier);
        }
    }
    
    protected _shoot(soldier: Soldier) {
        Bullet.shoot(this, soldier, "Arrow1" , {force: this.getForce()});
    }
}
