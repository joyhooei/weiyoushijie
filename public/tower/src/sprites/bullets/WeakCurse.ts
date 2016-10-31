class WeakCurse extends Bullet {
    protected _hitRadius: number;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [-1, 0, 1]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].curse(this.getForce(), this._fightingTicks);
        }
    }
}
