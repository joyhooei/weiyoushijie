class Enemy extends NPC {
    protected _soldiers: Soldier[];
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _bonus: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._bonus = this._get(properties, "bonus", 10);

        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 10 *application.frameRate);
        
        this._soldiers = [];
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
    }
    
    public addSoldier(soldier: Soldier) {
        this._soldiers.push(soldier);
        
        if (this._state == EntityState.moving) {
        	this.guard();

        	this._face(soldier);
        }
    }
    
    public totalSoldiers(): number {
        return this._soldiers.length;
    }
    
    public rmvSoldier(soldier: Soldier) {
        for(let i = 0;i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                this._soldiers.splice(i, 1);   
            }
        }
        
        if (this._soldiers.length == 0) {
            this._moveAgain();
        } else {
            this._face(this._soldiers[0]);
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
    	if (this._soldiers.length > 0) {
	        if (this._soldiers[0].hitBy(this)) {
	            this.rmvSoldier(this._soldiers[0]);
	        }
    	} else {
    		this._moveAgain();
    	}
    }
}
