class Tower extends Entity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
    }
    
    protected _idle() {
        this._do(EntityState.building);
    }
    
    protected _building() {
        if (this._ticks > this._buildTicks) {
            this._do(EntityState.guarding);
        }
    }
}
