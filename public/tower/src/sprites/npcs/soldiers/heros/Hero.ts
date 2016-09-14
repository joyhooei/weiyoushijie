class Hero extends Soldier implements SoldierCreator {
    protected _skill : number;
    
    protected _forceHigh: number;
    
    protected _forceLow: number;
    
    protected _legend: Legend;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._forceHigh   = this._get(properties, "forceHigh", 10);
        this._forceLow    = this._get(properties, "forceLow", 6);
        this._force = 0;
        
        this._skill = 0;
    }
    
    public setLegend(legend: Legend) {
        this._legend = legend;
    }

    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(5000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
    
    public getForce(): number {
        return this._forceLow + Math.round(Math.random() * (this._forceHigh - this._forceLow)) + this._force;
    }
    
    public paint() {
        if (EntityState.fighting == this._state) {
            this._display(0, this._hp.height + 2, this._skill);
            
            this._centerHp();
        } else {
            super.paint();
        }
    }      
}
