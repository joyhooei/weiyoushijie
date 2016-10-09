class Freeze extends Bullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addClip("freeze_moving", "south-moving").addClip("freeze_dying", "south-dying");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 100);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [-1, 0, 1]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].frozen();
        }
    }
}
