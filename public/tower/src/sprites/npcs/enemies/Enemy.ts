class Enemy extends NPC {
    private _soliders: Soldier[];
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._soliders = [];
    }
    
    public addSolider(solider: Soldier) {
        this._soliders.push(solider);
        this._do(EntityState.guarding);
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

    protected _moving() {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);

            this._do(EntityState.dead);
        }
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soliders[0].hitBy(this._damage)) {
                this.rmvSolider(this._soliders[0]);
            }
        }
    }
}
