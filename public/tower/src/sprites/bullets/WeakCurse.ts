class WeakCurse extends Bullet {
    protected _hitRadius: number;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.getEnemies();
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].curse(this.getForce(), application.frameRate << 2);
        }
    }
}
