class Arrow extends Bomb {
    protected _missing: boolean;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._missing = false;
    } 
    
    protected _hitTarget() {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
        } else {
            this._target.hitBy(this._damage);
        }
    }    
}
