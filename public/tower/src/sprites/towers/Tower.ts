class Tower extends Entity implements Selectable {
    protected _buildingTicks: number;
    
    protected _price: number;
	protected _upgradePrice: number;
    
    protected _guardX: number;
    protected _guardY: number;
    
    protected _guardRadius: number;
	
    protected _forceHigh: number;
    protected _forceLow: number;
	
	//暴击
	protected _critical: number;
	protected _criticalClip: egret.MovieClip;
    
    protected _range: GuardRange;

    protected _base: Base;

    public constructor() {
        super();
      
        this._displays.addClip("tower_building", "building");
		
		this._criticalClip = EntityDisplays.loadClip("critical");

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
		
		this._critical    = this._get(properties, "critical", 0);

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

	//是否可以升级
    public upgradable(): boolean {
        return true;
    }

	public getUpgradePrice(): number {
		return this._upgradePrice;
	}

    public totalSkills(): number {
        return 2;
    }

	//是否可以升级技能
    public skillUpgradable(skill:number): boolean {
        return false;
    }
	
	public getSkillUpgradePrice(skill:number): number {
		return 0;
	}
	
	public upgradeSkill(skill:number) {
	}
	
	//对tower使用skill
	public useSkill(tower: Tower) {
	}

    public getSkillLevel(skill:number) {
        return 0;
    }
	
    public getForce(): number {
		let force = Entity.random(this._forceLow, this._forceHigh);
		if (this._critical > 0 && Math.random() * 100 <= this._critical) {
    		return force << 1;
		} else {
			return force;
		}
    }
	
	public incCritical(critical: number) {
		if (this._critical == 0) {
			this._critical = Math.max(0, this._critical + critical);
			if (this._critical > 0) {
                this._criticalClip.x = (this._criticalClip.width >> 1) + ((this.width - this._criticalClip.width) / 2);
                this._criticalClip.y = (this._criticalClip.height >> 1) + (this.height - this._criticalClip.height);
				this.addChild(this._criticalClip);
				this._criticalClip.gotoAndPlay(0, -1);
			}
		} else {
			this._critical = Math.max(0, this._critical + critical);
			if (this._critical == 0) {
				this._criticalClip.stop();
				this.removeChild(this._criticalClip);
			}
		}
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
			
            let towers = this.findNeighbors();
            for (let i = 0; i < towers.length; i++) {
                towers[i].useSkill(this);
            }
        }
    }
	
	public findNeighbors(): Tower[] {
		return application.battle.findTowers(this.getCenterX(), this.getCenterY(), 100);
	}

    public select(again:boolean): boolean {
         if (again) {
            this.deselect();

            return false;
        } else {
            application.showUI(new TowerMenuUI(this._base), application.battle.getUI(), this.getCenterX(), this.getCenterY());
            
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
