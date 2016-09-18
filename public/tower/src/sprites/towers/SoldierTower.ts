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
        return this._addSoldier(soldier.relive(10 * application.frameRate));
    }
    
    public guard() {
        for(let i = 0; i <= 2; i++) {
            this._addSoldier(<Soldier>application.pool.get(this._soldierClaz, {guardX: this._guardX, guardY: this._guardY, idleTicks: i * application.frameRate}));
        }
        
        super.guard();
    }
    
    private _addSoldier(s:Soldier): Soldier {
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        application.battle.addSoldier(s);
        
        return s;
    }
}
