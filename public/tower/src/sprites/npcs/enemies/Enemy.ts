class Enemy extends NPC {
    private _soliders: Soldier[];
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._soliders = [];
    }
    
    public setPaths(paths: number[][]): boolean {
    	this._path = 0;
    	this._paths = paths;
   		
   		return this._nextPath();
    }
    
    public addSolider(solider: Soldier) {
        this._soliders.push(solider);
        this._do(EntityState.guarding);
        
        this._turn(this._direction8(this._soliders[0].x, this._soliders[0].y));
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
            this._do(EntityState.moving);
        } else {
            this._turn(this._direction8(this._soliders[0].x, this._soliders[0].y));
        }
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
    	}
    	
    	super._stateChanged(oldState, newState);
    }

    protected _moving() {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);

            this._do(EntityState.dead);
        }
    }
    
    //走一步，true表示已经到了终点
    protected _moveOneStep(): boolean {
    	this._steps ++;
        if (this._steps >= this._totalSteps) {
            if (!this._nextPath()) {
                //到达终点
                return true;
            }
        }

        return super._moveOneStep();
    }
    
    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soliders[0].hitBy(this._damage)) {
                this.rmvSolider(this._soliders[0]);
            }
        }
    }
}
