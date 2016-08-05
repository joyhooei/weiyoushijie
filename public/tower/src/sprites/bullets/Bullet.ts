class Bullet extends MovableEntity {
    private _target: NPC;

    private _missing: boolean;
    
    public constructor() {
        super();
        
        this._target = null;
        this._missing = false;
    }
    
    public setTarget(target: NPC) {
        this._target = target;
    }
    
    protected _idle() {
        this._do(EntityState.moving);
    }
    
    protected _moving() {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
            this._do(ObjectState.dying);
        } else {
            this._turn(this._direction8(this._target.x, this._target.y));
            
            this._steps(this._target.x, this._target.y);

            this.x += this._steps[0];
            this.y += this._steps[1];
            
            if (this.collide(this._target)) {
                this._missing = false;
                this._do(EntityState.dying);
    
                this._target.hitBy(this._damage);
            }
        }
    }
    
    protected _dying(ticks: number) {
        if (ticks -  this._ticks > 3) {
            this._do(EntityState.dead);
        }
    }
}
