class MagicTower extends Tower {
    protected _enemy : Enemy;

    protected _bulletClaz: string;

    public constructor() {
        super();
    }
    
    protected _guarding() {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this.fight();
        }
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
             if (this._enemy == null 
                    || !this._enemy.active() 
                    || !this._enemy.within(this.getCenterX(), this.getCenterY(), this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            }

            if (this._enemy) {
                Bullet.shootByNPC(this, this._enemy, this._bulletClaz);
                
                this._ticks++;
            } else {
                this.guard();
            }
        }
    }  
}
