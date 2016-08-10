class Bullet extends MovableEntity {
    private _target: NPC;

    private _missing: boolean;
    
    private _damage: number;
    
    public constructor() {
        super();
        
        this._target = null;
        this._missing = false;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._damage = properties.damage;
    }
    
    public setTarget(target: NPC) {
        this._target = target;
    }
    
    protected _moving() {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
            this._do(EntityState.dying);
        } else {
            this._turn(this._direction8(this._target.x, this._target.y));
            this._computeSteps(this._target.x, this._target.y);

            this._moveOneStep();
            
            if (this.collide(this._target)) {
                this._missing = false;
                this._do(EntityState.dying);
    
                this._target.hitBy(this._damage);
            }
        }
    }
    
    protected _dying() {
        if (this._ticks > 3) {
            this._do(EntityState.dead);
        }
    }
}
