class Bullet extends Object {
    private _target: NPC;
    
    private _speed: number;
    
    private _missing: boolean;
    
    public constructor(target: NPC) {
        super();
        
        this._target = target;
        
        this._speed = 1;
    }
    
    protected _idle(ticks: number) {
        this._changeState(ObjectState.moving, ticks);
    }
    
    protected _moving(ticks: number) {
        if (this._target.dead()) {
            this._missing = true;
            this._changeState(ObjectState.dying, ticks);
        } else {
            let dx = this._target.x - this.x;
            let dy = this._target.y - this.y;
            
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            this.x += this._speed * dx / distance;
            this.y += this._speed * dy / distance;
            
            if (this.collide(_target)) {
                this._missing = false;
                this._changeState(ObjectState.dying, ticks);
    
                this._target.hitBy(this._damage);
            }
        }
    }
    
    protected _dying(ticks: number) {
        if (ticks -  this._ticks > 3) {
            this._changeState(ObjectState.dead, ticks);
        } else {
            if (this._missing) {
                //显示missing图片
            } else {
                //显示击中图片
            }
        }
    }
}
