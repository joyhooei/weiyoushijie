class Bomb extends CastBullet {
    protected _hitRadius: number;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getBottomY(), this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
               enemies[i].shootBy(this);
        }
    }

    protected _act():boolean {
        if (this._state == EntityState.building) {
            this.move();
            return false;
        }

        return super._act();
    }
}
