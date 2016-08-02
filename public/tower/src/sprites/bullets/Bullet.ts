class Bullet extends Object {
    private _target: NPC;
    
    private _speed: number;
    
    public constructor(target: NPC) {
        super();
        
        this._target = target;
        
        this._speed = 1;
    }
    
    protected _idle(ticks: number) {
        this._state = ObjectState.moving;
        this._ticks = ticks;
    }
    
    protected _moving(ticks: number) {
        let dx = this._target.x - this.x;
        let dy = this._target.y - this.y;
        
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        this.x += this._speed * dx / distance;
        this.y += this._speed * dy / distance;
        
        if (this.collide(_target)) {
            this._state = ObjectState.dying;
            this._ticks = ticks;
            
            this._target.hitBy(this._damage);
        }
    }
    
    protected _dying(ticks: number) {
        if (ticks -  this._ticks > 3) {
            this._state = ObjectState.dead;
        }
    }
}
