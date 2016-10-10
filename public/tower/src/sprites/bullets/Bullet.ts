class Bullet extends MovableEntity {
    protected _target: NPC;
    
    protected _targetX: number;
    protected _targetY: number;
    
    protected _force: number;

    protected _fightTicks: number;
    
    public static shootAtNPC(sourceX: number, sourceY: number, target: NPC, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz, properties);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public static shootByNPC(shooter: NPC, target: NPC, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz, properties);
        bullet.x = shooter.getCenterX();
        bullet.y = shooter.getCenterY();
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public static shoot(sourceX: number, sourceY: number, targetX: number, targetY: number, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz, properties);
        bullet.setCenterX(sourceX);
        bullet.setCenterY(sourceY);
        bullet.setTargetPosition(targetX - bullet.width / 2, targetY - bullet.height / 2);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public constructor() {
        super();

        this.width = this.height = 5;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target  = null;
        this._targetX = 0;
        this._targetY = 0;

        this._force = this._get(properties, 'force', 10);
        
        this._fightTicks = this._get(properties, 'fightTicks', 10);
    }
    
    public getForce(): number {
    	return this._force;
    }    

    public setTarget(target: NPC) {
        this._target  = target;
        
        this.setTargetPosition(target.getCenterX(), target.getCenterY());
    }
    
    public setTargetPosition(targetX: number, targetY: number) {
        if (this._targetX != targetX|| this._targetY != targetY) {
            this._targetX = targetX;
            this._targetY = targetY;
            
            this._computeSteps(this.x, this.y, this._targetX, this._targetY);    
            this._turn(this._direction4(targetX, targetY));
        }    
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this.fight();
            
            this._hitTarget();
        }
    }

    protected _fighting() {
        this._ticks ++;
        if (this._ticks >= this._fightTicks) {
            this.erase();
        }
    }
    
    protected _hitTarget() {
    }
}
