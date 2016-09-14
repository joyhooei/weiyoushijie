class Hero extends Soldier implements SoldierCreator {
    protected _skill : number;
    
    protected _defaultDamage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill = 0;
        
        this._defaultDamage = this._damage;
    }

    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(5000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
    
    public paint() {
        if (EntityState.fighting == this._state) {
            this._display(0, 5, this._skill);
        } else {
            this._display(0, 5);
        }
    }      
}
