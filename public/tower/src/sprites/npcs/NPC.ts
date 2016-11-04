abstract class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _forceHigh: number;
    protected _forceLow: number;

    protected _armor: number;

	protected _magicArmor: number;
    
    protected _resistance: number;
    
    protected _hitSpeed: number;
    
    //海拔高度，地表：0，地下：-1，空中：1
    protected _altitude: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hp = <Hp>application.pool.get("Hp", properties);
		this._hp.height = 3;
		this._hp.width  = 20;
		this._hp.x = 0;
		this._hp.y = 0;
        this.addChild(this._hp);
        
        this._hitSpeed  = this._get(properties, "hitSpeed", Math.round(0.9 * application.frameRate));
        
		let force:number  = this._get(properties, "force", 10);
        this._forceHigh   = this._get(properties, "forceHigh", force);
        this._forceLow    = this._get(properties, "forceLow", force);

        this._armor  = this._get(properties, "armor", 0);
		this._magicArmor  = this._get(properties, "magicArmor", 0);
        
        this._resistance  = this._get(properties, "_resistance", 0);
        
        this._altitude  = this._get(properties, "altitude", 0);
    }

	public stand(x: number, y: number) {
        this.setCenterX(x);
        this.setBottomY(y);
	}

    public getForce(): number {
    	return Entity.random(this._forceLow, this._forceHigh);
    }

	public getMaxHp(): number {
		return this._hp.getMaxHp();
	}

    public erase() {
        if (this._hp) {
            this._hp.erase();
            this._hp = null;
        }

        super.erase();
    }
    
    public shootBy(bullet: Bullet): boolean {
		let dead = this.damage(this._actualDamage(bullet.getForce(), bullet.getHitType()));
		if (dead) {
			bullet.targetKilled(this);
		}
		
		return dead;
    }

    public hitBy(npc: NPC): boolean {
    	this.fight();
    	
    	let d = npc.getForce();
    	
    	if (this._resistance > 0) {
    		npc.damage(Math.round(d * (100 - this._resistance) / 100));
    	}
    	
    	return this.damage(this._actualDamage(d, HitType.normal));
    }
    
    protected _actualDamage(d: number, hitType:HitType): number {
		if (hitType == HitType.normal) {
    		return Math.round(d * (100 - this._armor) / 100);
		} else if (hitType == HitType.magic) {
			return Math.round(d * (100 - this._magicArmor) / 100);
		} else {
			return d;
		}
    }
    
    public damage(d: number): boolean {
        if (this.active()) {           
            if (this._hp.damage(d)) {
                this.kill();
                
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }    	
    }
    
    public reachable(x: number, y: number, radius: number, altitudes: number[]): boolean {
        return this.active() && this._altitude in altitudes && this.within(x, y, radius);
    }

    protected _face(npc:NPC) {
        this._turn(this._directionAt(npc.x, npc.y));
    }
    
    protected _readyFight() {
    	return this._ticks % this._hitSpeed == 0;
    }
    
	protected _idle() {
		this._ticks ++;
    	if (this._ticks >= this._idleTicks) {
        	this.move();
        	
        	if (this._hp) {
        		this._hp.move();
        	}
    	}
    }

	protected _fighting() {
		if (this._readyFight() && !this._clipPlaying) {
			this._play();
		}
		
		this._ticks ++;
	}

	protected _act(): boolean {
		if (this._state == EntityState.fighting) {
			this._hitOpponents();
			
			//需要等打击时间到才再一次播放动画
			return false;
		} else if (this._state == EntityState.dying) {
			//播放一次
			return false;
		} else {
			return true;
		}
	}

    abstract protected _hitOpponents();

	protected _render(xDelta = 0, yDelta = 0, idx = 0): egret.DisplayObject {
        this._renderHp();
		
		return super._render(0, 5, 0);
	}

    protected _renderHp() {
        if (this._hp) {
            let x =  Math.min(0, (this.width - this._hp.width) >> 1);
            if (x != this._hp.x) {
                this._hp.x = x;
            }
        }
    }
}
