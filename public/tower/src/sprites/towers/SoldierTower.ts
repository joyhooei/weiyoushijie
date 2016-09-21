class SoldierTower extends Tower implements SoldierCreator {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _soldierClaz: string;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        soldier.relive(10 * application.frameRate);
        this._addSoldier(soldier);

        return soldier;
    }
    
    public guard() {
        super.guard();
        
        this._createSoldier(this._soldierClaz, {guardX: this._guardX + 10, guardY: this._guardY + 10, idleTicks: 0});
        this._createSoldier(this._soldierClaz, {guardX: this._guardX - 10, guardY: this._guardY + 10, idleTicks:  application.frameRate});
        this._createSoldier(this._soldierClaz, {guardX: this._guardX + 10, guardY: this._guardY - 10, idleTicks: 2 * application.frameRate});
    }

    private _createSoldier(claz:string, options:any) {
        this._addSoldier(<Soldier>application.pool.get(claz, options));
    }
    
    private _addSoldier(s: Soldier) {
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        
        application.battle.addSoldier(s);
    }
}
