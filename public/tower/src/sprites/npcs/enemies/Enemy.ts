class Enemy extends NPC {
    private _soliders: Soldier[];
    
    public constructor() {
        super();
        
        this.initialize();
    }
    
    public initialize(options?:any) {
        super.initialize(options);
        
        this._soliders = [];
    }
    
    public addSolider(solider: Soldier) {
        this._soliders.push(solider);
        
        if (this._state == EntityState.moving) {
            this._do(EntityState.guarding);
        }
    }
    
    public totalSoliders(): number {
        return this._soliders.length;
    }
    
    public rmvSolider(solider: Soldier) {
        for(let i = 0;i < this._soliders.length; i++) {
            if (this._soliders[i] == solider) {
                this._soliders.splice(i, 1);   
            }
        }
        
        if (this._soliders.length == 0) {
            this._do(EntityState.moving);
        }
    }
    
    protected _stateChanged(oldState:EntityState, newState:EntityState) {
        if (newState == EntityState.guarding) {
            this._turn(this._direction8(this._soliders[0].x, this._soliders[0].y));
        }
        
        super._stateChanged(oldState, newState);
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);
            
            this._do(EntityState.dead);
        }
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            this._soliders[0].hitBy(this._damage);
            if (this._soliders[0].dying() || this._soliders[0].dead()) {
                this._soliders.splice(0, 1);
                if (this._soliders.length == 0) {
                    this._do(EntityState.moving);
                }
            }
        }
    }
}
