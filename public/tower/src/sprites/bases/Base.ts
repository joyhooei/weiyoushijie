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
    }
    
    public getGuardX(): number {
        return this._guardX;
    }
    
    public getGuardY(): number {
        return this._guardY;
    }
    
    public buildTower(tower: Tower) {
        if (this._tower) {
            this._tower.erase();
        }
        
        this._tower = tower;
        this._tower.setParent(this);
    }
    
    public sellTower() {
        this._tower.kill();

        this._tower = null;
    }
    
    public select(again:boolean) {
        if (this._tower) {
            application.battle.showTool(new TowerMenuUI(this._tower), this.x, this.y);
        } else {
            application.battle.showTool(new BuildTowerUI(this), this.x, this.y);
        }
    }
    
    public deselect() {
        application.battle.hideAllTools();
    }
    
    public paint() {
        if (this._tower) {
            this._tower.paint();
        } else {
            super.paint();
        }
    }
}
