class ArrowSolider extends Solider {
    protected _enemy: Enemy;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._enemy = null;
    }

    protected _guarding() {
        this._do(EntityState.fighting);
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            let x = this.x;
            let y = this.y;
            if (this._parent) {
                x += this._parent.x;
                y += this._parent.y;
            }
            
            if (this._enemy == null 
                    || this._enemy.dying() 
                    || this._enemy.dead()
                    || !this._enemy.intersects(x, y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(x, y, this._guardRadius, [0]);
                
                this._face(this._enemy);
            }

            if (enemy) {
                let arrow = <Bullet>application.pool.get("Arrow");
                arrow.x = this.x;
                arrow.y = this.y;
                arrow.setTarget(enemy);
                
                application.addBullet(arrow);
            }
        }
    }    
}
