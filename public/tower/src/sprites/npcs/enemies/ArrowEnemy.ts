class ArrowEnemy extends Enemy {
    private _attackRadius: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._attackRadius = this._get(properties, "attackRadius", 20);
    }
    
    protected _moving() {
        super._moving();
        
        if (this.active()) {
            let soldier = application.battle.findSoldier(this.x, this.y, this._attackRadius);
            if (soldier) {
                this.addSolider(soldier);
                
                this.fight();
            }
        }
    } 
    
    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soldiers[0].active()) {
                Bullet.shoot(this, this._soldiers[0], "Arrow");
            } else {
                this.rmvSoldier(this._soldiers[0]);
            }
        }
    }    
}
