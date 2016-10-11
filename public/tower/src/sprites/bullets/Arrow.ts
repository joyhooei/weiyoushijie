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
        let dx: number = this.x - this._startX;
        let dy: number = this._startY - this.y;
        this.rotation = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        return super._moveOneStep();
    }
}
