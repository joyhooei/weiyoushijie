class Tower extends Entity {
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
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
