class Enemy extends NPC {
    private _soliders: Solider[];
    
    public constructor() {
        super();
        
        this._soliders = [];
    }
    
    public addSolider(solider:Solider) {
        this._soliders.push(solider);
        
        if (this._state == ObjectState.moving) {
            this._changeState(ObjectState.guarding);
        }
    }
    
    protected _moving(ticks: number) {
        if (this._moveOneStep()) {
            application.incLifes(-1);
            
            this._changeState(ObjectState.dead);
        }
    }

    protected _fighting(ticks: number) {
        if (ticks % this._hitSpeed == 0) {
            this._soliders[0].hitBy(this._damage);
            if (this._soliders[0].dying()) {
                this._soliders.splice(0, 1);
                if (this._soliders.length == 0) {
                    this._changeState(ObjectState.moving);
                }
            }
        }
    }
}
