class Enemy extends NPC {
	protected _livesTaken: number;
	
    protected _soldiers: Soldier[];
	protected _totalSoldiers: number;
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _bonus: number;

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
        
        this._bonus = this._get(properties, "bonus", 10);

		this._livesTaken = this._get(properties, "livesTaken", 1);
        
        this._soldiers = [null, null, null, null, null, null];
		this._totalSoldiers = 0;
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
		
		this._abnormalState = 0;
		this._abnormalTicks = [-1, -1, -1, -1, -1];
		this._abnormalDamages = [0, 0, 0, 0, 0];
    }

	public frozen(damage: number, ticks: number) {
		this._startAbnormal(1, damage, ticks);
	}

	public burn(damage: number, ticks: number) {
		this._startAbnormal(2, damage, ticks);
	}

	public weak(damage: number, ticks: number) {
		this._startAbnormal(3, damage, ticks);
	}

	public miscast(damage: number, ticks: number) {
		this._startAbnormal(4, damage, ticks);
	}

	public black(damage: number, ticks: number) {
		this._startAbnormal(5, damage, ticks);
	}

	private _startAbnormal(state: number, damage: number, ticks: number) {
		if (this._abnormalTicks[state - 1] <= 0) {
			this._abnormalState ++;

			this._abnormalTicks[state - 1]   = ticks;
			this._abnormalDamages[state - 1] = damage;

			if (state == 1 && this._clip) {
				this._clip.stop();
			}

			this._renderAbnormal(state);
		} else {
			this._abnormalTicks[state - 1]   += ticks;
			this._abnormalDamages[state - 1] += damage;
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
		
		this._stopAllAbnormals();
    	
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
            	application.battle.incLives(-this._livesTaken);
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
