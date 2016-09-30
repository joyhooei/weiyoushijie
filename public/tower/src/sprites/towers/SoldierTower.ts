class SoldierTower extends Tower implements SoldierCreator {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _soldierClaz: string;
    
    protected _soldiers: Soldier[];

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        
        this._soldiers = [];
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        soldier.relive(10 * application.frameRate);
        this._addSoldier(soldier);

        return soldier;
    }
    
    public guard() {
        super.guard();
        
        let delta = 25;
        this._createSoldier(this._soldierClaz, {guardX: this._guardX + delta, guardY: this._guardY + delta, idleTicks: 0});
        this._createSoldier(this._soldierClaz, {guardX: this._guardX - delta, guardY: this._guardY + delta, idleTicks:  application.frameRate});
        this._createSoldier(this._soldierClaz, {guardX: this._guardX + delta, guardY: this._guardY - delta, idleTicks: 2 * application.frameRate});
    }
    
    public erase() {
        for(let i = 0;i < this._soldiers.length;i++) {
            this._soldiers[i].setCreator(null);
            this._soldiers[i].erase();
        }
        this._soldiers = [];
        
        super.erase();
    }

    private _createSoldier(claz:string, options:any) {
        this._addSoldier(<Soldier>application.pool.get(claz, options));
    }
    
    private _addSoldier(s: Soldier) {
        let found = false;
        for(let i = 0;i < this._soldiers.length;i++) {
            if (this._soldiers[i] == s) {
                found = true;
            }
        }
        if (!found) {
            this._soldiers.push(s);
        }
        
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        
        application.battle.addSoldier(s);
    }
}
