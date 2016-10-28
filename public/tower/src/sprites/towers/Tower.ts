class Tower extends Entity implements SelectableEntity {
    protected _buildingTicks: number;
    
    protected _price: number;
	protected _upgradePrice: number;
    
    protected _guardX: number;
    protected _guardY: number;
    
    protected _guardRadius: number;
	
    protected _forceHigh: number;
    protected _forceLow: number;
    
    protected _range: GuardRange;

    protected _base: Base;

    public constructor() {
        super();
      
        this._displays.addClip("tower_building", "building")

        this.touchEnabled = true;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._buildingTicks = this._get(properties, "buildingTicks", application.frameRate);
        
        this._price = this._get(properties, "price", 100);
        this._upgradePrice = this._get(properties, "upgradePrice", 100);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        this._guardRadius = this._get(properties, "guardRadius", 10);
		
		let force:number  = this._get(properties, "force", 10);
        this._forceHigh   = this._get(properties, "forceHigh", force);
        this._forceLow    = this._get(properties, "forceLow", force);

		this._range = null;
        this._base  = null;
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
	
	public getSkillUpgradePrice(skill:number): number {
		console.error("upgrade skill not support in " + this.claz());
		
		return 0;
	}
	
	public upgradeSkill(skill:number) {
		console.error("upgrade skill not support in " + this.claz());
	}
	
    public getForce(): number {
    	return this._forceLow + Math.round(Math.random() * (this._forceHigh - this._forceLow));
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
        if (this._ticks > this._buildingTicks) {
            this.guard();
        }
    }
	
	protected _showMenu(parent: AbstractUI, x: number, y: number) {
        this.show(new UpgradeTowerUI(this._base), parent, x, y);
	}

    public select(again:boolean): boolean {
         if (again) {
            this.deselect();

            return false;
        } else {
            this._showMenu(application.battle.getUI(), this.getCenterX(), this.getCenterY());
            
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
