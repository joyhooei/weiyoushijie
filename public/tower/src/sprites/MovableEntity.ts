class MovableEntity extends Entity {
    //一步走多远
    protected _step: number;
    
    //等待多少时间开始显示
    protected _idleTicks: number;
    
    protected _dyingTicks:number;
    
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
        
        this._step       = this._get(properties, "step", 1);
        this._idleTicks  = this._get(properties, "idleTicks", 0);
        this._dyingTicks = this._get(properties, "idleTicks", 5);

        this._delta = [];
        this._totalSteps = 0;
        this._steps = 0;
    }

    //走一步，true表示已经到了终点
    protected _moveOneStep(): boolean {
    	this._steps ++;
        if (this._steps >= this._totalSteps) {
            return true;
        } else {
	        this.x += this._delta[0];
	        this.y += this._delta[1];
	        
	        return false;
        }
    }

    //计一步走的距离
    protected _computeSteps(x1:number, y1:number, x2:number, y2:number): boolean {
	    let stepX = 0;
	    let stepY = 0;
	    
	    let dx = Math.abs(x1 - x2);
	    let dy = Math.abs(y1 - y2);
	    if (dx >= dy) {
	    	this._totalSteps = Math.floor(dx / this._step);
	    } else {
	    	this._totalSteps = Math.floor(dy / this._step);
	    }
	    
	    if (this._totalSteps > 0) {
	        stepX = dx / this._totalSteps;
	        if (x2 < x1) {
	            stepX = 0 - stepX;
	        }
	        
	        stepY = dy / this._totalSteps;
	        if (y2 < y1) {
	            stepY = 0 - stepY;
	        }
	
		   	this._delta = [stepX, stepY];
			this._steps = 0;
			
			return true;
	    } else {
	    	return false;
	    }
    }
    
    protected _idle() {
    	if (this._ticks >= this._idleTicks) {
        	this.move();
    	}
    }
    
    protected _dying() {
        if (this._ticks >= this._dyingTicks) {
            this.erase();
        }
    }    
}
