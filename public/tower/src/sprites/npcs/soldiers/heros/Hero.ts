class Hero extends Soldier implements SoldierCreator {
    protected _skill : number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill = 0;
    }

    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(5000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
}
