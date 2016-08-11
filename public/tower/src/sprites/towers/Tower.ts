class Tower extends Entity {
    protected _hitSpeed: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed = this._get(properties, "hitSpeed", 10);
    }
    
    protected _idle() {
        this._do(EntityState.building);
    }
    
    protected _building() {
        if (this._ticks > 100) {
            this._do(EntityState.guarding);
        }
    }
}
