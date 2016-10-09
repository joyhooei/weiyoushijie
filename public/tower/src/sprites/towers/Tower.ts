class Tower extends Entity implements SelectableEntity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _price: number;
	
	protected _sellPrice: number;
    
    protected _guardRadius: number;
    
    protected _range: GuardRange;

    protected _base: Base;

    public constructor() {
        super();
      
        this._displays.addClip("tower_building", "building")

        this.touchEnabled = true;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hitSpeed   = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", application.frameRate);
        
        this._price = this._get(properties, "price", 100);
        this._sellPrice = this._get(properties, "sellPrice", Math.round(this._price * 0.6));
        
        this._guardRadius = this._get(properties, "guardRadius", 10);

        this._base = null;
    }

    public setBase(base: Base) {
        this._base = base;
    }

	public getGuardRadius(): number {
		return this._guardRadius;
	}

	public getPrice(): number {
		return this._price;
	}

	public getSellPrice(): number {
		return this._sellPrice;
	}

    public erase() {
        super.erase();
        
        application.battle.incGolds(this.getSellPrice());
    }

    protected _idle() {
        this.build();
  
        if (this._range) {
            this._range.erase();
            this._range = null;
        }    

        application.battle.incGolds(-this.getPrice());
    }
    
    protected _building() {
        this._ticks ++;
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    }

   public select(again:boolean): boolean {
         if (again) {
            this.deselect();

            return false;
        } else {
            this._range = <GuardRange>application.pool.get("GuardRange", {guardRadius: this._guardRadius});

            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius;

            this._range.width  = this._guardRadius << 1;
            this._range.height = this._guardRadius << 1;

            application.battle.addEntity(this._range);

            application.showUI(new UpgradeTowerUI(this._base), application.battle.parent, this.getCenterX(), this.getCenterY());
            
            return true;
        }
    }
    
    public deselect() {
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
    }
}
