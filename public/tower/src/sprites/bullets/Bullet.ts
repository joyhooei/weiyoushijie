class Bullet extends MovableEntity {
    protected _target: NPC;
    
    pritected _shooter: NPC;

    protected _targetX: number;
    protected _targetY: number;
    
    protected _damage: number;
    
    public static shoot(shooter:NPC, target: NPC, claz:string) {
        let bullet = <Bullet>application.pool.get(claz);
        bullet.setTarget(target);
        bullet.setShooter(shooter);
        application.battle.addBullet(bullet);
    }
    
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
    
    public setTarget(shooter: NPC) {
        this._shooter = shooter;
        
        this.x = shooter.getMapX() + shooter.width / 2;
        this.y = shooter.getMapY() + shooter.height /2 ;
    }
    
    public setTarget(target: NPC) {
        this._target  = target;
        
        this._targetX = target.x;
        this._targetY = target.y;
        
        this._computeSteps(this._target.x, this._target.y);
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this.kill();
        } else {
            //如果目标移动，重新调整方向和路径
            if (this._targetX != this._target.x || this._targetY != this._target.y) {
                this.setTarget(this._target);
            }
        }
    }
}
