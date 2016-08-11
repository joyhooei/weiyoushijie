class MovableEntity extends Entity {
    //一步走多远
    protected _step: number;
    
    //等待多少时间开始显示
    protected _idleTicks: number;
    
    protected _dyingTicks:number;
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    //当前路径每步走的距离，0表示x方向，1表示y方向
    protected _delta: number[];
    //当前路径一共需要走多少步
    protected _totalSteps: number;
    //当前路径已经走了多少步
    protected _steps: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._step       = this.get(properties, "step", 10);
        this._idleTicks  = this.get(properties, "idleTicks", 0);
        this._dyingTicks = this.get(properties, "idleTicks", 5);
        
        this._paths = [];
        this._path  = 0;
        
        this._delta = [];
        this._totalSteps = 0;
        this._steps = 0;
    }
    
    public moveTo(x:number, y:number) {
        if (this._paths.length != 2 || this._paths[1][0] != x || this._paths[1][1] != y)) {
            this.setPaths([[this.x, this.y], [x, y]]);
        }
    }
    
    public setPaths(paths: number[][]): boolean {
    	this._path = 0;
    	this._paths = paths;
   		
   		return this._nextPath();
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
    
    //走一步，true表示已经到了终点
    protected _moveOneStep(): boolean {
    	this._steps ++;
        if (this._steps >= this._totalSteps) {
            if (!this._nextPath()) {
                //到达终点
                return true;
            }
        }
        
        this.x += this._delta[0];
        this.y += this._delta[1];
        
        return false;
    }

    //计一步走的距离
    private _computeSteps(x:number, y:number) {
	    let stepX = 0;
	    let stepY = 0;
	    
	    let dx = Math.abs(this.x - x);
	    let dy = Math.abs(this.y - y);
	    if (dx >= dy) {
	    	this._totalSteps = Math.round(dx / this._step);
	    } else {
	    	this._totalSteps = Math.round(dy / this._step);
	    }
	    
        stepX = dx / this._totalSteps;
        if (x < this.x) {
            stepX = 0 - stepX;
        }
        
        stepY = dy / this._totalSteps;
        if (y < this.y) {
            stepY = 0 - stepY;
        }

	   	this._delta] = [stepX, stepY];
		this._steps = 0;
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
    	if (newState == EntityState.moving && oldState != EntityState.idle) {
    		this._readToMove();
    	}
    	
    	super._stateChanged(oldState, newState);
    }
    
    protected _idle() {
    	if (this._ticks >= this._idleTicks) {
        	this._do(EntityState.moving);
    	}
    }
    
    protected _dying() {
        if (this._ticks > this._dyingTicks) {
            this._do(EntityState.dead);
        }
    }    
}
