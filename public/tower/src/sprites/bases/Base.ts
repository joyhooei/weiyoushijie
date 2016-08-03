class Base extends SelectableObject {
    private _tower: Tower;
    
    public constructor() {
        super();
        
        this._tower = null;
    }
    
    public setTower(tower: Tower) {
        this._tower = tower;
    }
    
    protected _select(again:boolean) {
        if (this._tower) {
            application.mao.showToow(new TowerMenuUI(), this.x, this.y);
        } else {
            application.map.showTool(new BuildTowerUI(), this.x, this.y);
        }
    }
}
