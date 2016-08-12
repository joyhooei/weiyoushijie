class Tower extends Entity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _price: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
        this._price = this._get(properties, "price", 100);
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
    	if (newState == EntityState.building) {
    		application.battle.incGolds(-this._price);
    	}
    	
    	super._stateChanged(oldState, newState);
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
