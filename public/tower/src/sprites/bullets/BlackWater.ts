class BlackWater extends Magic {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addClip("blackwater_fighting");
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _act():boolean {
        if (this._state == EntityState.fighting) {
            let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [0, 1]);
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].shootBy(this);
            }
        }

        return super._act();
    }
}
