class Curse extends Bullet {
    protected _hitRadius: number;
    
    protected _curseTicks: number;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
        this._curseTicks = this._get(properties, 'curseTicks', application.frameRate << 2);
    }
    
    protected _hitTarget() {
        let enemies = this._findEnemeies();
        for (let i = 0; i < enemies.length; i++) {
            this._hitEnemy(enemies[i], this._force, this._curseTicks);
        }
    }
    
    protected _findEnemeies(): Enemy[] {
        return application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [-1, 0, 1]);
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
    }

    protected _idle() {
    	this.fight();
    }
}
