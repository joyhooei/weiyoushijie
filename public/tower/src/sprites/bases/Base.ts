class Base extends Entity implements SelectableEntity {
    protected _tower: Tower;
    
    protected _guardX: number;
    
    protected _guardY: number;
    
    protected _unused: boolean;
    
    protected _range: GuardRange;
    
    public constructor() {
        super();

        this.$touchEnabled = true;
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        
        this._tower = null;
        
        this._unused = true;

        this.guard();
    }

    public update():boolean {
        if (this._tower) {
            this._tower.update();
        }
        
    	return super.update();
    }
    
    public unused() : boolean {
        return this._unused;
    }
    
    public getGuardX(): number {
        return this._guardX;
    }
    
    public getGuardY(): number {
        return this._guardY;
    }
    
    public getTower(): Tower {
        return this._tower;
    }
    
    public setTower(tower: Tower) {
        this._unused = false;
        
        this._clearTower();
        
        this._tower = tower;
        
        if (this._tower) {
            this.removeChildren();
            
            this.addChild(this._tower);

            this._tower.build();
        } else {
            this.stain();
        }
    }
    
    private _clearTower() {
        if (this._tower) {
            this._tower.erase();
            
            this._tower = null;
        }        
    }
    
    public erase() {
        super.erase();
  
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        
        this._clearTower();
    }

    public select(again:boolean): boolean {
         if (again) {
            this.deselect();

            return false;
        } else {
            if (this._tower) {
                let guardRadius = this._tower.getGuardRadius();

                this._range = <GuardRange>application.pool.get("GuardRange", {guardRadius: guardRadius});

                this._range.x = this.getCenterX() - guardRadius;
                this._range.y = this.getCenterY() - guardRadius;

                this._range.width  = guardRadius << 1;
                this._range.height = guardRadius << 1;

                application.battle.addEntity(this._range);

                application.showUI(new TowerMenuUI(this), application.battle.parent, this.getCenterX(), this.getCenterY());
            } else {
                application.showUI(new BuildTowerUI(this), application.battle.parent, this.getCenterX(), this.getCenterY());
            }
            
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
