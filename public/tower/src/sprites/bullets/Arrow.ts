class Arrow extends CastBullet {
    protected _missing: boolean;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._missing = false;
    } 
    
    protected _hitTarget() {
        if (this._target.active()) {
            this._target.hitBy(this._damage);
        } else {
            this._missing = true;
        }
    }    
}
