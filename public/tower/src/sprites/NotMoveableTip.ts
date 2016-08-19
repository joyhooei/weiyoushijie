class NotMoveableTip extends Entity {
    private _dyingTicks: number;
    
    public constructor() {
        super();
        
        this.kill();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._dyingTicks = this._get(properties, "dyingTicks", 1000);
    }
    
    protected _dying() {
        if (this._ticks > _dyingTicks) {
            this.erase();
        }
    }
}
