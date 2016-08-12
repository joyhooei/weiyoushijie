class Bullet extends MovableEntity {
    private _target: NPC;

    private _targetX: number;
    private _targetY: number;
    
    private _damage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target  = null;
        
        this._targetX = 0;
        this._targetY = 0;

        this._damage = this._get(properties, 'damage', 10);
    }
    
    public setTarget(target: NPC) {
        this._target  = target;
        
        this._targetX = target.x;
        this._targetY = target.y;
        
        this._computeSteps(this._target.x, this._target.y);
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this._do(EntityState.dying);
        } else {
            //如果目标移动，重新调整方向和路径
            if (this._targetX != this._target.x || this._targetY != this._target.y) {
                this.setTarget(this._target);
            }
        }
    }
}
