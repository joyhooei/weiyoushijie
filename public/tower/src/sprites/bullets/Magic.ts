class Magic extends Bullet {
    protected _skill: Skill;

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill = Skill.get(application.skills, "MagicTower", 0);
        if (this._skill) {
            if (this._skill.attrs.level == 3) {
                this._force = Math.round(this._force * 1.05);
            }
            
            if (this._skill.attrs.level == 6) {
                this._force = Math.round(this._force * 1.1);
            }
        }
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
            if (this._skill && this._skill.attrs.level == 3 && Math.random() <= 0.1) {
                this._target.damage(this._force);
            } else {
                this._target.shootBy(this);
            }
        }
    }       
}
