class Enemy extends NPC {
    protected _soldiers: Soldier[];
	protected _totalSoldiers: number;
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _bonus: number;

	//冰冻或者火烧状态
	protected _abnormalTicks: number;
	protected _abnormalState: number;
	protected _abnormalDamage: number;
	protected _abnormalDisplays: egret.DisplayObject[];
    
    public constructor() {
        super();
		
		this._abnormalDisplays = [new egret.Bitmap(RES.getRes("frozen_png")), new egret.Bitmap(RES.getRes("burn_png"))];
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._bonus = this._get(properties, "bonus", 10);

        this._idleTicks = this._get(properties, "idleTicks", 0);
        
        this._soldiers = [null, null, null, null, null, null];
		this._totalSoldiers = 0;
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
		
		this._abnormalState = 0;
		this._abnormalTicks = -1;
    }

	public frozen(damage: number, ticks: number) {
		this._addAbnormal(1, damage, ticks);
	}

	public burn(damage: number, ticks: number) {
		this._addAbnormal(2, damage, ticks);
	}

	public posion(damage: number, ticks: number) {
		this._addAbnormal(3, damage, ticks);
	}

	private _addAbnormal(state: number, damage: number, ticks: number) {
		this._restore();
		
		this._abnormalState  = state;
		this._abnormalTicks  = ticks;
		this._abnormalDamage = damage;
		
		if (state == 1 && this._clip) {
			this._clip.stop();
		}

		let display = this._abnormalDisplays[this._abnormalState - 1];
		display.x = (this.width - display.width) >> 1;
		display.y = this.height - display.height;
		this._displaySprite.addChild(display);
	}

	private _restore() {
		if (this._abnormalState == 1 && this._clip) {
			this._clip.gotoAndPlay(0, 1);
		}

        try {
		    this._displaySprite.removeChild(this._abnormalDisplays[this._abnormalState - 1]);
        } catch(error) {
        }
		
		this._abnormalState = 0;
		this._abnormalTicks = -1;
	}

	public update():boolean {
		if (this._abnormalState == 0) {
			return super.update();
		}
		
		if (this._abnormalTicks >= 0) {
			if (this._abnormalTicks % application.frameRate == 0) {
				if (this.damage(this._abnormalDamage)) {
					this._restore();
				}
			}
			
			this._abnormalTicks --;	
		} else {
			this._restore();
		}
		
		if (this._abnormalState == 1) {
			//冰冻
			return false;
		} else {
			return super.update();
		}
	}
    
    public addSoldier(soldier: Soldier): number {
        for(let i = 0;i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                return;
            }
        }

        let hitPos = this._getHitPosition(soldier);

        this._soldiers[hitPos] = soldier;
		this._totalSoldiers ++;
        
        if (this._state == EntityState.moving) {
        	this.guard();

        	this._face(soldier);
        }

        return hitPos;
    }

    private _getHitPosition(soldier: Soldier): number {
        if (soldier.x < this.x) {
            //检查左边有没有攻击位置
            for(let i = 0; i < 3; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
            for(let i = 3; i < 6; i++) {
                 if (this._soldiers[i] == null) {
                    return i;
                }               
            }
        } else {
            //检查右边有没有攻击位置
            for(let i = 3; i < 6; i++) {
                 if (this._soldiers[i] == null) {
                    return i;
                }               
            }
            for(let i = 0; i < 3; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
        }

        return -1;
    }
    
    public totalSoldiers(): number {
        return this._totalSoldiers;
    }

    public firstSoldier(): Soldier {
        for(let i = 0;i < this._soldiers.length; i++) {
            if (this._soldiers[i] ) {
                return this._soldiers[i];   
            }
        }

        return null;
    }
    
    public rmvSoldier(soldier: Soldier) {
        for(let i = 0;i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                this._soldiers[i] = null;
				this._totalSoldiers --;
            }
        }
        
        if (this._totalSoldiers > 0) {
            this._face(this.firstSoldier());
        } else {
            this._moveAgain();
        }
    }
    
    private _nextPath() {
    	let p0 = this._paths[this._path];
    	
   		this.setCenterX(p0[0]);
   		this.setBottomY(p0[1]);

        this._path ++;
        
        let p1 = this._paths[this._path];

        this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
        this._turn(this._directionAt(p1[0], p1[1]));
    }

    public kill() {
    	super.kill();
    	
    	application.battle.incGolds(this._bonus);
    }
    
    protected _moveAgain() {
    	//格斗结束后，继续行走需要转向
    	this._turn(this._directionAt(this._paths[this._path][0], this._paths[this._path][1]));
    	
    	this.move();
    }

    protected _moving() {
        if (this._moveOneStep()) {
        	if (this._path < this._paths.length - 1) {
        		this._nextPath();
        	} else {
            	application.battle.incLives(-1);
            	this.erase();
        	}
        }
    }
    
    protected _hitOpponents() {
        let s = this.firstSoldier();
    	if (s) {
	        if (s.hitBy(this)) {
	            this.rmvSoldier(s);
	        }
    	} else {
    		this._moveAgain();
    	}
    }
}
