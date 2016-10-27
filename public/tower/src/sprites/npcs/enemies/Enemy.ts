class Enemy extends NPC {
    protected _soldiers: Soldier[];
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _bonus: number;

	protected _frozenTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._bonus = this._get(properties, "bonus", 10);

        this._idleTicks = this._get(properties, "idleTicks", 0);
        
        this._soldiers = [null, null, null, null, null, null];
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
		
		this._frozenTicks = 0;
    }

	public frozen() {
		this._frozenTicks = 3 * application.frameRate;
		
		if (this._clip) {
			this._clip.stop();
		}
	}

	public update():boolean {
		if (this._frozenTicks <= 0) {
			return super.update();
		} else {
			this._frozenTicks --;
			
			if (this._frozenTicks <= 0) {
				if (this._clip) {
					this._clip.gotoAndPlay(0, 1);
				}
			}
			
			return false;
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
        let count:number = 0;
        for(let i = 0; i< this._soldiers.length; i++) {
            if (this._soldiers[i]) {
                count ++;
            }
        }

        return count;
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
            }
        }
        
        let s = this.firstSoldier();
        if (s) {
            this._face(s);
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
        this._turn(this._direction4(p1[0], p1[1]));
    }

    public kill() {
    	super.kill();
    	
    	application.battle.incGolds(this._bonus);
    }
    
    protected _moveAgain() {
    	//格斗结束后，继续行走需要转向
    	this._turn(this._direction4(this._paths[this._path][0], this._paths[this._path][1]));
    	
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
