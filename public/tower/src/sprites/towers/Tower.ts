class Tower extends Entity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _buyPrice: number;
    protected _sellPrice: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
        
        this._buyPrice = this._get(properties, "buyPrice", 100);
        this._sellPrice = this._get(properties, "sellPrice", 100);
    }

    protected _stateChanged(oldState: EntityState, newState: EntityState) {
    	if (newState == EntityState.building) {
    		application.battle.incGolds(-this.buyPrice);
    	} else if (newState == EntityState.dying) {
    	    application.battle.incGolds(this._sellPrice);
    	} else if (newState == EntityState.dead) {
    	    application.pool.set(this);
    	}
    	
    	super._stateChanged(oldState, newState);
    }
    
    protected _idle() {
        this.build();
    }
    
    protected _building() {
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    }
}
