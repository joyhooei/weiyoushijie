class BombTower extends Tower {
    protected _guardRadius: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardRadius = this._get(properties, "guardRadius", 10);
    }

    protected _guarding() {
        if (this._ticks % this._hitSpeed == 0) {
            let enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, [0]);
            if (enemy) {
                let bomb = <Bomb>application.pool.get("Bomb");
                bomb.x = this.x;
                bomb.y = this.y;
                bomb.setTarget(enemy);
                
                application.addBullet(bomb);
            }
        }
    }
}
