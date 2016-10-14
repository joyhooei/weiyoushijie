class Arrow extends CastBullet {
    protected _missing: boolean;
    
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

    protected _fighting() {
        if (this._missing) {
            super._fighting();
        } else {
            this.erase();
        }
    }

    protected _moveOneStep():boolean {
        let dx: number = this.x - this._startX;
        let dy: number = this.y - this._startY;
        this.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
        
        return super._moveOneStep();
    }
}
