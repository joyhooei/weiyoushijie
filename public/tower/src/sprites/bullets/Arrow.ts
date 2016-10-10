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
            this._target.shootBy(this);
        } else {
            this._missing = true;
        }
    }

    protected _moveOneStep():boolean {
        let dx: number = this._startX - this.x;
        let dy: number = this._startY - this.y;
        let angel: number = Math.atan2(dy,dx);
        this.rotation = angel * 180 / Math.PI + 180;
        
        return super._moveOneStep();
    }
}
