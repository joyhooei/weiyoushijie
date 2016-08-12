class RemoteHitTower extends Tower {
    protected _enemy: Enemy;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._enemy = null;
    }

    protected _guarding() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null 
                    || this._enemy.dying() 
                    || this._enemy.dead()
                    || !this._enemy.intersects(this.parent.x, this.parent.y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.parent.x, this.parent.y, this._guardRadius, [0]);
            }

            if (this._enemy) {
                this._fire();
            }
        }
    }
    
    protected _fire() {
        let bomb = this._createBullet();
        bomb.x = this.parent.x;
        bomb.y = this.parent.y;
        bomb.setTarget(this._enemy);
        
        application.addBullet(bomb);        
    }
    
    protected _createBullet():Bullet {
        return null;
    }
}
