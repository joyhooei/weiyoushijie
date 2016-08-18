class ArrowSoldier extends Soldier {
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
    }

    protected _guarding() {
        this.fight();
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            let x = this.getMapX();
            let y = this.getMapY();

            if (this._enemy == null 
                    || !this._enemy.active() 
                    || !this._enemy.intersect(x, y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(x, y, this._guardRadius, [0]);
                
                this._face(this._enemy);
            }

            if (this._enemy) {
                Bullet.shoot(this, this._enemy, "Arrow");
            }
        }
    }    
}
