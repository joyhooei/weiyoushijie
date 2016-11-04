enum HitType {
    //物理伤害，可以被护甲armor减少
    normal = 0,
    //魔法伤害，可以被魔抗magicArmor减少
    magic,
    //真实伤害，无视护甲和魔抗
    damage
};

abstract class Bullet extends MovableEntity {
    protected _shooter: Shooter;

    protected _target: NPC;
    
    protected _force: number;

    protected _hitType: number;

    protected _fightingTicks: number;
    
    public static shoot(shooter: Shooter, target: NPC, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz, properties);
        bullet.setShooter(shooter);
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public static throw(sourceX: number, sourceY: number, targetX: number, targetY: number, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz, properties);
        bullet.setCenterX(sourceX);
        bullet.setCenterY(sourceY);
        bullet.setTargetPosition(targetX - bullet.width / 2, targetY - bullet.height / 2);
        application.battle.addBullet(bullet);
        
        return bullet;
    }

    public static blast(shooter: Shooter, claz:string, properties?): Bullet {
        let bullet = <Bullet>application.pool.get(claz,  properties);
        bullet.setShooter(shooter);
        bullet.fight();
        application.battle.addBullet(bullet);
        
        return bullet;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target  = null;
        this._targetX = 0;
        this._targetY = 0;

        this._force = this._get(properties, 'force', 10);
 
        this._hitType = this._get(properties, 'hitType', HitType.normal);
       
        this._fightingTicks = this._get(properties, 'fightingTicks', 10);
        
        this._shooter = null;
    }
    
    public getForce(): number {
    	return this._force;
    }

    public getHitType(): HitType {
        return this._hitType;
    }

    public setShooter(shooter: Shooter) {
        this._shooter = shooter;
        this.setCenterX(shooter.getMuzzleX());
        this.setCenterY(shooter.getMuzzleY());
    }

    public setTarget(target: NPC) {
        this._target  = target;
        this.moveTo(target.getCenterX(), target.getCenterY());
    }

    public targetKilled(target: NPC) {
        if (this._shooter) {
            this._shooter.targetKilled(target);
        }
    }

    protected _arrive() {
        if (this._displays.has(EntityState.fighting)) {
            this.fight();
        } else {
            this.erase();
        }
        
        this._hitTarget();
    }

    protected _fighting() {
        this._ticks ++;
        if (this._ticks >= this._fightingTicks) {
            this.erase();
        }
    }
    
    abstract protected _hitTarget();
}
