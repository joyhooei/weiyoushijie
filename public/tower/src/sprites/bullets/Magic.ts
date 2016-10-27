class Magic extends Bullet {
    public constructor() {
        super();
    }
    
    protected _idle() {
    	this._ticks ++;
    	if (this._ticks >= this._idleTicks) {
        	this.build();
    	}
    }
    
    protected _act() {
        if (this._state == EntityState.building) {
            this.move();
            
            return false;
        } else {
            return true;
        }
    }

    protected _hitTarget() {
        if (this._target.active()) {
            this._target.shootBy(this);
        }
    }       
}
