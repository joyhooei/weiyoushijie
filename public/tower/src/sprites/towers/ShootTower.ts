class ShootTower extends Tower implements Shooter {
    protected _enemy : Enemy;

    protected _bulletClaz: string;
    
    protected _shootSpeed: number;
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._shootSpeed   = this._get(properties, "shootSpeed", 60);
    }
   
    protected _guarding() {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this.fight();
        }
    }
    
    public targetKilled(target:NPC) {
    }

    public getMuzzleX(): number {
        return this.getCenterX();
    }

    public getMuzzleY(): number {
        return this.y;
    }
   
    protected _fighting() {
        if (this._ticks % this._shootSpeed == 0) {
             if (this._enemy == null 
                    || !this._enemy.active() 
                    || !this._enemy.within(this.getCenterX(), this.getCenterY(), this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            }

            if (this._enemy) {
                this._shoot();
            } else {
                this.guard();
            }
        }

        this._ticks ++;
    }
    
    protected _shoot() {
        Bullet.shoot(this, this._enemy, this._bulletClaz, {force: this._force});
    }
}
