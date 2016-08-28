class Base extends Entity {
    protected _tower: Tower;
    
    protected _guardX: number;
    
    protected _guardY: number;
    
    public constructor() {
        super();

        application.battle.enableSelect(this);
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        
        this._tower = null;

        this.guard();
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
        this._clearTower();
        
        this._tower = tower;
        
        if (this._tower) {
            this.removeChildren();
            
            this.addChild(this._tower);
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

    public select(again:boolean) {
        if (!again) {
            application.battle.showTool(new TowerMenuUI(this), this.x, this.y);
        }
    }
    
    public deselect() {
        application.battle.hideAllTools();
    }
}
