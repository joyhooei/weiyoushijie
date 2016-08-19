class Bullet extends MovableEntity {
    protected _target: NPC;
    
    protected _targetX: number;
    protected _targetY: number;
    
    protected _damage: number;
    
    public static shootAtNPC(sourceX: number, sourceY: number, target: NPC, claz:string): Bullet {
        let bullet = <Bullet>application.pool.get(claz);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public static shootByNPC(shooter: NPC, target: NPC, claz:string): Bullet {
        let bullet = <Bullet>application.pool.get(claz);
        bullet.x = shooter.getCenterX();
        bullet.y = shooter.getCenterY();
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public static shoot(sourceX: number, sourceY: number, targetX: number, targetY: number, claz:string): Bullet {
        let bullet = <Bullet>application.pool.get(claz);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTargetPosition(targetX, targetY);
        application.battle.addBullet(bullet);
        
        return bullet;
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

    public setTarget(target: NPC) {
        this._target  = target;
        
        this.setTargetPosition(target.getCenterX(), target.getCenterY());
    }
    
    public setTargetPosition(targetX: number, targetY: number) {
        this._targetX = targetX;
        this._targetY = targetY;
        
        this._computeSteps(this._targetX, this._targetY);        
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this._hitTarget();
            
            this.kill();
        } else {
            //如果目标移动，重新调整方向和路径
            if (this._target && (this._targetX != this._target.x || this._targetY != this._target.y)) {
                this.setTarget(this._target);
            }
        }
    }
    
    protected _hitTarget() {
    }
}
