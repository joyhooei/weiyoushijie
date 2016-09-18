class Hero extends Soldier {
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
    }
    
    public setLegend(legend: Legend) {
        this._legend = legend;
    }

    public getForce(): number {
        return this._forceLow + Math.round(Math.random() * (this._forceHigh - this._forceLow)) + this._force;
    }
}
