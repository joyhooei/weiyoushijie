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
                let arrow = <Bullet>application.pool.get("Arrow");
                arrow.x = this.x;
                arrow.y = this.y;
                arrow.setTarget(this._soldiers[0]);
                
                application.battle.addBullet(arrow);
            } else {
                this.rmvSoldier(this._soldiers[0]);
            }
        }
    }    
}
