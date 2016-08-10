class Base extends Entity {
    private _tower: Tower;
    
    public constructor() {
        super();

        application.battle.enableSelect(this);
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._tower = null;
    }
    
    public setTower(tower: Tower) {
        this._tower = tower;
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
}
