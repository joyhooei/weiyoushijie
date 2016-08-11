class Bullet extends MovableEntity {
    private _target: NPC;

    private _damage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target  = null;

        this._damage = this._get(properties, 'damage', 10);
    }
    
    public setTarget(target: NPC) {
        this.moveTo(target.x, target.y);
        this._target = target;
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this._do(EntityState.dying);
        } else {
            //如果目标移动，重新调整方向和路径
            this.moveTo(this._target.x, this._target.y);
        }
    }
}
