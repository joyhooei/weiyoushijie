class Tip extends Entity {
    protected _dyingTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._dyingTicks = this._get(properties, "dyingTicks", 3 * application.frameRate);
        
        this.kill();
    }
    
    protected _dying() {
        this._ticks ++;
        if (this._ticks > this._dyingTicks) {
            this.erase();
        }
    }
}
