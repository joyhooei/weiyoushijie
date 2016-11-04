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
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._bonus = this._get(properties, "bonus", 10);

		this._livesTaken = this._get(properties, "livesTaken", 1);
        
        this._soldiers = [null, null, null, null, null, null];
		this._totalSoldiers = 0;
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
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
    
    private _nextPath():boolean {
		if (this._path < this._paths.length - 1) {
			let p0 = this._paths[this._path];

			this.setCenterX(p0[0]);
			this.setBottomY(p0[1]);

			this._path ++;

			let p1 = this._paths[this._path];

			this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
			this._turn(this._directionAt(p1[0], p1[1]));
			
			return true;
		} else {
			return false;
		}
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
        if (this._moveOneStep() && !this._nextPath()) {
            this._arrive();
        }
    }

 	//到达目的地
	protected _arrive() {
		application.battle.incLives(-this._livesTaken);
		this.erase();
	}

	protected _fighting() {
		super._fighting();
		
		//soldier may be killed by many enemies
		for(let i = 0; i < this._soldiers.length; i++) {
			if (this._soldiers[i] && !this._soldiers[i].active()) {
				this.rmvSoldier(this._soldiers[i]);
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

	protected _born(claz: string, x: number, y: number):Enemy {
        let e = <Enemy>application.pool.get(claz);
        e.stand(x, y);
        application.battle.addEnemy(e);

        return e;
	}		
}
