class MovableEntity extends Entity {
    //一步走多远
    protected _step: number;
    
    //一步走的距离    
    protected _steps: number[];
    
    //所有路径
    protected _paths: number[][];
    
    //当前路径
    protected _path: number;
    
    protected _idleTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._step     = this.get(properties, "step", 10);
        this._steps    = [this._step, 0];

        this.setPaths(this._get(properties, "paths", []);
        
        this._idleTicks = 0;
    }
    
    public setPaths(paths: number[][]) {
    	if (paths.length >= 2) {
	   		this.x = paths[0][0];
	   		this.y = paths[0][1];
	   		
	    	this._turn(this._direction8(paths[1][0], paths[1][1]));
	    	this._computeSteps(paths[1][0], paths[1][1]);
	    	
	    	this._path = 1;
	    	this._paths = paths;
    	}
    }
    
    protected _idle() {
    	if (this._ticks >= this._idleTicks) {
        	this._do(EntityState.moving);
    	}
    }
    
    //走一步
    protected _moveOneStep(): boolean {
        var path = this._paths[this._path];
        if (Math.abs(this.x - path[0]) < this._step && Math.abs(this.y - path[1]) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            
            this._path ++;
            
            path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
            
            this._computeSteps(path[0], path[1]);
        }
        
        this.x += this._steps[0];
        this.y += this._steps[1];
        
        return false;
    }

    //计一步走的距离
    protected _computeSteps(x:number, y:number) {
	    let stepX = 0;
	    let stepY = 0;
	    
	    let dx = Math.abs(this.x - x);
	    let dy = Math.abs(this.y - y);
	    if (dx >= dy) {
	        stepX = this._step;
	        if (x < this.x) {
	            stepX = 0 - stepX;
	        }
	        
	        stepY = dy / (dx / stepX);
	        if (y < this.y) {
	            stepY = 0 - stepY;
	        }
	    } else {
	        stepY = this._step;
	        if (y < this.y) {
	            stepY = 0 - stepY;
	        }
	        
	        stepX = dx / (dy / stepY);
	        if (x < this.x) {
	            stepX = 0 - stepX;
	        }
	    }
	    
	   	this._steps[0] = stepX;
		this._steps[1] = stepY;
    }
}
