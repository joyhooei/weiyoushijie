class Thunder extends Bullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addAllClips("thunder_fighting", "fighting");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 200);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0, 1]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    }
}
