class SoldierTower extends Tower {
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
        let s = soldier.relive(10000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;
    }
    
    public guard() {
        for(let i = 0; i < 3; i++) {
            let soldier = <Soldier>application.pool.get(this._soldierClaz, {"guardX": this._guardX, "guardY": this._guardY});
            soldier.setCreator(this);
            soldier.x = this.getCenterX();
            soldier.y = this.getCenterY();            
            application.battle.addSoldier(soldier);
        }
        
        super.guard();
    }
}
