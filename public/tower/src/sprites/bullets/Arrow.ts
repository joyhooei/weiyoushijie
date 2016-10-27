class Arrow extends CastBullet {
    protected _missing: boolean;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._missing = false;

        this.rotation = -90;
    } 
    
    protected _hitTarget() {
        if (this._target.active()) {
            if (this._target.shootBy(this)) {
                this._shooter.targetKilled(this._target);
            }
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
        let x = this.x;
        let y = this.y;

        let over = super._moveOneStep();

        if (this.x != x ||this.y != y) {
            let dx: number = this.x - x;
            let dy: number = y - this.y;

            this.rotation = - Math.atan2(dy, dx) * 180 / Math.PI;
        }

        return over;
    }
}
