class Tip extends Entity {
    private _dyingTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._dyingTicks = this._get(properties, "dyingTicks", 1000);
        
        this.kill();
    }
    
    protected _dying() {
        this._ticks ++;
        if (this._ticks > this._dyingTicks) {
            this.erase();
        }
    }
}
