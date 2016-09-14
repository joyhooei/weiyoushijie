class Hero extends Soldier implements SoldierCreator {
    protected _skill : number;
    
    protected _damageHigh: number;
    
    protected _damageLow: number;
    
    protected _legend: Legend;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._damageHigh   = this._get(properties, "damageHigh", 10);
        this._damageLow    = this._get(properties, "damageLow", 6);
        
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
    
    public getDamage(): number {
        return this._damageLow + Math.round(Math.random() * (this._damageHigh - this._damageLow));
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
