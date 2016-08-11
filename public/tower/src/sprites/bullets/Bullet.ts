class Bullet extends MovableEntity {
    private _target: NPC;

    private _missing: boolean;
    
    private _damage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target = null;
        this._missing = false;
        
        this._damage = this._get(properties, 'damage', 10);
    }
    
    public setTarget(target: NPC) {
        this.moveTo(target.x, target.y);
        this._target = target;
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            if (this._target.dying() || this._target.dead()) {
                this._missing = true;
            } else {
                this._missing = false;
                
                this._target.hitBy(this._damage);
            }
                
            this._do(EntityState.dying);
        } else {
            //如果目标移动，重新调整方向和路径
            this.moveTo(this._target.x, this._target.y);
        }
    }
    
    protected _dying() {
        if (this._ticks > 3) {
            this._do(EntityState.dead);
        }
    }
}
