class MovableEntity extends Entity {
    //一步走多远
    private _step: number;
    
    //一步走的距离    
    private _steps: number[];
    
    //所有路径
    private _paths: number[][][];
    //当前路径
    private _path: number;
    
    public constructor() {
        super();
    }
    
    //走一步
    private _moveOneStep(): bool {
        var path = this._paths[this.path];
        if (Math.abs(this.x - path[0]) < this._step && Math.abs(this.y - path[1]) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            
            this._path ++;
            
            path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
            
            this._steps(path[0], path[1]);
        }
        
        this.x += this._steps[0];
        this.y += this._steps[1];
        
        return false;
    }
    
    //转向
    private _turn(direction: EntityDirection) {
    	if (direction != this._direction) {
    		this._direction = direction;
    		
    		this._render();
    	}
    }
    
    //计一步走的距离
    private _steps(x:number, y:number, step:number) {
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
	    
	   	this._steps = [stepX, stepY];
    }
}
