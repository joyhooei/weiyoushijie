class ArrowSolider extends NPC {
    public constructor() {
        super();
    }

    protected _guarding() {
        this._do(EntityState.fighting);
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            let enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, [0, 1]);
            if (enemy) {
                let arrow = <Bomb>application.pool.get("Arrow");
                arrow.x = this.x;
                arrow.y = this.y;
                arrow.setTarget(enemy);
                
                application.addBullet(arrow);
            }
        }
    }    
}
