class RemoteHitTower extends Tower {
    protected _enemy: Enemy;
    
    protected _bulletName: string;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._bulletName = this._get(properties, "bulletName", "Bomb");
        
        this._enemy = null;
    }

    protected _guarding() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null 
                    || !this._enemy.active() 
                    || !this._enemy.within(this.parent.x, this.parent.y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.parent.x, this.parent.y, this._guardRadius, [0]);
            }

            if (this._enemy) {
                Bullet.shootAtNPC(this.getCenterX(), this.getCenterY(), this._enemy, this._bulletName);
            }
        }
    }
}
