class Bomb extends CastBullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[1] != this._target) {
                enemies[i].shootBy(this);
            }
        }
        
        this._target.shootBy(this);
    }
}
