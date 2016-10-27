class ShootSoldier extends Soldier implements Shooter {
    protected _bulletClaz: string;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
    }
    
    protected _idle() {
        this.guard();
    }

    protected _guarding() {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this._face(this._enemy);
            this.fight();
        }
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
             if (this._enemy == null 
                    || !this._enemy.active() 
                    || !this._enemy.within(this.x, this.y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, [0, 1]);
                if (this._enemy) {
                    this._face(this._enemy);
                }
            }

            if (this._enemy) {
                Bullet.shoot(this, this._enemy, this._bulletClaz, {force: this.getForce()});
            } else {
                this.guard();
            }
        }

        this._ticks++;
    }    

    public getMuzzleX(): number {
        return this.x;
    }

    public getMuzzleY(): number {
        return this.y;
    }
    
    public targetKilled(target:NPC) {
    }
}
