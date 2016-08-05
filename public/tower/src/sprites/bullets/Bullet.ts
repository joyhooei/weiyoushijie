class Bullet extends Object {
    private _target: NPC;
    
    private _step: number;
    
    private _missing: boolean;
    
    public constructor() {
        super();
        
        this._target = null;
        
        this._step = 1;
        
        this._missing = false;
    }
    
    public setTarget(target: NPC) {
        this._target = target;
    }
    
    protected _idle() {
        this._do(ObjectState.moving);
    }
    
    protected _moving() {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
            this._do(ObjectState.dying);
        } else {
            let dx = this._target.x - this.x;
            let dy = this._target.y - this.y;
            
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            this.x += this._speed * dx / distance;
            this.y += this._speed * dy / distance;
            
            if (this.collide(_target)) {
                this._missing = false;
                this._do(ObjectState.dying);
    
                this._target.hitBy(this._damage);
            }
        }
    }
    
    protected _dying(ticks: number) {
        if (ticks -  this._ticks > 3) {
            this._do(ObjectState.dead);
        }
    }
}
