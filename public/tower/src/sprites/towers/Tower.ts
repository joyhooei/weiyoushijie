class Tower extends Entity implements SelectableEntity {
    protected _hitSpeed: number;
    
    protected _buildTicks: number;
    
    protected _price: number;
	
	protected _upgradePrice: number;
    
    protected _guardRadius: number;
	
	protected _force: number;
    
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
		
		this._force = this._get(properties, "force", 10);
		
        this._upgradePrice = this._get(properties, "upgradePrice", 100);
        
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
		return Math.round(this._price / 2);
	}

	public getUpgradePrice(): number {
		return this._upgradePrice;
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
            application.showUI(new UpgradeTowerUI(this._base), application.battle.getUI(), this.getCenterX(), this.getCenterY());
            
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
