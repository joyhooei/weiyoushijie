class Magic extends Bullet {
    private _targetX: number;
    private _targetY: number;
    
    public constructor() {
        super();
    }
    
    public setTarget(target: NPC) {
        super.setTarget(target);
        
        this._targetX = target.x;
        this._targetY = target.y;
        
        this._computeSteps(target.x, target.y);
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
