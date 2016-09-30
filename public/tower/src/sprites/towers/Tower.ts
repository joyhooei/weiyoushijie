class Tower extends Entity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _price: number;
    
    protected _guardRadius: number;

    public constructor() {
        super();
      
        this._displays.addClip("tower_building", "building")
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 5 * application.frameRate);
        
        this._price = this._get(properties, "price", 100);
        
        this._guardRadius = this._get(properties, "guardRadius", 10);
    }

	public getPrice(): number {
		return this._price;
	}

	public getSellPrice(): number {
		return Math.round(this._price * 0.6);
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
        
        application.battle.incGolds(this.getSellPrice());
    }

    protected _idle() {
        this.build();
        
        application.battle.incGolds(-this.getPrice());
    }
    
    protected _building() {
        this._ticks ++;
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    }
}
