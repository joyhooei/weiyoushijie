class Magic extends Bullet {
    public constructor() {
        super();
    }
    
    protected _hitTarget() {
        if (this._target.active()) {
            this._target.shootBy(this);
        }
    }       
}
