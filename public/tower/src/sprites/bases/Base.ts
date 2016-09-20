class Base extends Entity implements SelectableEntity {
    protected _tower: Tower;
    
    protected _guardX: number;
    
    protected _guardY: number;
    
    protected _unused: boolean;
    
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
        
        this._clearTower();
    }

    public select(again:boolean): boolean {
        if (this._tower) {
            application.showUI(new TowerMenuUI(this._tower), application.battle.parent, this.getCenterX(), this.getCenterY());
        } else {
            application.showUI(new BuildTowerUI(this), application.battle.parent, this.getCenterX(), this.getCenterY());
        }

        return true;
    }
    
    public deselect() {
        application.battle.hideAllTools();
    }
}
