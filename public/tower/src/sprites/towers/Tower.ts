class Tower extends Entity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _buyPrice: number;
    protected _sellPrice: number;
    
    protected _guardRadius: number;

    public constructor() {
        super();

        this.width = this.height = 50;
        
        this._displays.addClip("building")
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
        
        this._buyPrice = this._get(properties, "buyPrice", 100);
        this._sellPrice = this._get(properties, "sellPrice", 100);
        
        this._guardRadius = this._get(properties, "guardRadius", 10);
    }

    public getCenterX(): number {
    	return this.parent.x + (this.width >> 1);
    }
    
    public getCenterY(): number {
    	return this.parent.y + (this.height >> 1);
    }
	
	public getBottomY(): number {
		return this.parent.y + this.height;
	}

    public erase() {
        super.erase();
        
        application.battle.incGolds(this._sellPrice);
    }

    protected _idle() {
        this.build();
        
        application.battle.incGolds(-this._buyPrice);
    }
    
    protected _building() {
        this._ticks ++;
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    }
}
