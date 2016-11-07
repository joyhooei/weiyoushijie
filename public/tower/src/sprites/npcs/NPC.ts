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

	//冰冻或者火烧状态
	protected _abnormalState: number;
	protected _abnormalTicks: number[];
	protected _abnormalDamages: number[];
	protected _abnormalDisplays: egret.DisplayObject[];

    public constructor() {
        super();
		
		this._abnormalDisplays = [new egret.Bitmap(RES.getRes("frozen_png")), new egret.Bitmap(RES.getRes("burn_png"))];
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
		
		this._abnormalState = 0;
		this._abnormalTicks = [-1, -1, -1, -1, -1, -1];
		this._abnormalDamages = [0, 0, 0, 0, 0, 0];
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

	public addMaxHp(hp: number) {
		this._hp.addMaxHp(hp);
	}

	public setArmor(arm: number) {
		this._armor = arm;
	}

	public getArmor(): number {
		return this._armor;
	}

	public setMagicArmor(arm: number) {
		this._magicArmor = arm;
	}

	public getMagicArmor(): number {
		return this._magicArmor;
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

    public kill() {
    	super.kill();
		
		this._stopAllAbnormals();
    }

	public frozen(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(1, damage, ticks, overlying);
	}

	public burn(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(2, damage, ticks, overlying);
	}

	public weak(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(3, damage, ticks, overlying);
	}

	public miscast(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(4, damage, ticks, overlying);
	}

	public black(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(5, damage, ticks, overlying);
	}

	public attack(damage: number, ticks: number, overlying=true) {
		this._startAbnormal(6, damage, ticks, overlying);
	}

	private _startAbnormal(state: number, damage: number, ticks: number, overlying: boolean) {
		if (this._abnormalTicks[state - 1] <= 0) {
			this._abnormalState ++;

			this._abnormalTicks[state - 1]   = ticks;
			this._abnormalDamages[state - 1] = damage;

			if (state == 1 && this._clip) {
				this._clip.stop();
			}

			this._renderAbnormal(state);
		} else {
			this._abnormalTicks[state - 1] = Math.max(ticks, this._abnormalTicks[state - 1]);
			if (overlying) {
				this._abnormalDamages[state - 1] += damage;
			}
		}
	}

	private _stopAbnormal(state: number) {
		this._abnormalState --;
		
		if (state == 1 && this._clip) {
			this._clip.gotoAndPlay(0, 1);
		}
		
		this._abnormalTicks[state - 1] = -1;
		
		this._clearAbnormal(state);		
	}

	private _clearAbnormal(state: number) {
		let display = this._abnormalDisplays[state - 1];
		if (display) {
			this.removeChild(display);
		}
	}

	private _stopAllAbnormals() {
		for(let i = 0; i < this._abnormalTicks.length; i++) {
			if (this._abnormalTicks[i] > 0) {
				this._clearAbnormal(i + 1);
				this._abnormalTicks[i] = -1;
			}
		}
		
		this._abnormalState = 0;
	}

	private _renderAbnormal(state: number) {
		let display = this._abnormalDisplays[state - 1];
		if (display) {
			display.x = (this.width - display.width) >> 1;
			display.y = this.height - display.height;
			this.addChild(display);
		}
	}

	public update():boolean {
		if (this._abnormalState == 0) {
			return super.update();
		}
		
		for(let i = 0; i < this._abnormalTicks.length; i++) {
			if (this._abnormalTicks[i] > 0) {
				if (this._abnormalTicks[i] % application.frameRate == 0) {
					if(this.damage(this._abnormalDamages[i])) {
						return super.update();
					}
				}

				this._abnormalTicks[i] --;
			} else if (this._abnormalTicks[i] == 0){
				this._stopAbnormal(i + 1);
			}
		}
		
		if (this._abnormalTicks[0] > 0) {
			//冰冻
			return false;
		} else {
			return super.update();
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

    protected abstract _hitOpponents();

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
