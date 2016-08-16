class Enemy extends NPC {
    protected _soliders: Soldier[];
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _golds: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._golds = this._get(properties, "golds", 10);
        
        this._soliders = [];
        
        this._paths = [];
        this._path  = 0;
    }
    
    public setPaths(paths: number[][]): boolean {
    	this._path = 0;
    	this._paths = paths;
   		
   		return this._nextPath();
    }
    
    public addSolider(solider: Soldier) {
        this._soliders.push(solider);
        this.guard();
        
        this._face(this._soliders[0]);
    }
    
    public totalSoliders(): number {
        return this._soliders.length;
    }
    
    public rmvSolider(solider: Soldier) {
        for(let i = 0;i < this._soliders.length; i++) {
            if (this._soliders[i] == solider) {
                this._soliders.splice(i, 1);   
            }
        }
        
        if (this._soliders.length == 0) {
            this.move();
        } else {
            this._face(this._soliders[0]);
        }
    }
    
    public reachable(x: number, y: number, radius: number, altitudes: number[]): boolean {
        return !this._state >= EntityState.dying && this._altitude in altitudes && this.intersect(x, y, radius);
    }
    
    private _nextPath(): boolean {
    	if (this._path < this._paths.length - 1) {
	    	let path = this._paths[this._path];
	    	
	   		this.x = path[0];
	   		this.y = path[1];
		   		
	        this._path ++;
	        
	        this._readToMove();
	        
	        return true;
    	} else {
    		return false;
    	}
    }
    
    private _readToMove() {
        let path = this._paths[this._path];
        this._turn(this._direction8(path[0], path[1]));
        this._computeSteps(path[0], path[1]);    	
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
    	if (newState == EntityState.moving && oldState != EntityState.idle) {
    		this._readToMove();
    	} else if (newState == EntityState.dying) {
    		application.battle.incGolds(this._golds);
    	}
    	
    	super._stateChanged(oldState, newState);
    }

    protected _moving() {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);

            this.erase();
        }
    }
    
    //走一步，true表示已经到了终点
    protected _moveOneStep(): boolean {
        return super._moveOneStep() && !this._nextPath();
    }
    
    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soliders[0].hitBy(this._damage)) {
                this.rmvSolider(this._soliders[0]);
            }
        }
    }
}
