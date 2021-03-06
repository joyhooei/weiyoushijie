abstract class MovableEntity extends Entity {
    //一步走多远
    protected _moveSpeed: number;
    
    //等待多少时间开始显示
    protected _idleTicks: number;
    
    protected _dyingTicks:number;
    
    protected _targetX: number;
    protected _targetY: number;
    
    //当前路径每步走的距离
    protected _stepX: number;
    protected _stepY: number;
    //当前路径一共需要走多少步
    protected _totalSteps: number;
    //当前路径已经走了多少步
    protected _steps: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._moveSpeed  = this._get(properties, "moveSpeed", 1);
        this._idleTicks  = this._get(properties, "idleTicks", 0);
        this._dyingTicks = this._get(properties, "dyingTicks", application.frameRate);

        this._readyComputeSteps();
    }

    //x和y是脚站立的位置
    public moveTo(x:number, y:number) {
		this._targetX = x;
		this._targetY = y;

        this._readyComputeSteps();
		this._turn(this._directionAt(x, y));
    }

	protected _readyComputeSteps() {
        this._stepX = 0;
        this._stepY = 0;
        this._totalSteps = -1;
        this._steps = 0;
	}

	//到达目的地
	protected abstract _arrive();

    protected _moving() {
        if (this._totalSteps == -1) {
            if (!this._computeSteps(this.x, this.y, this._targetX, this._targetY)) {
                this._arrive();
                return;
            }
        }

        if (this._moveOneStep()) {
            this._arrive();
        }
    }

    //走一步，true表示已经到了终点
    protected _moveOneStep(): boolean {
    	this._steps ++;
        if (this._steps > this._totalSteps) {
            return true;
        } else {
	        this.x += this._stepX;
	        this.y += this._stepY;
	        
	        return false;
        }
    }

	protected _ahead(distance: number): number[] {
		let steps = Math.min(this._totalSteps - this._steps, Math.round(distance / (this._stepX + this._stepY)));
		if (steps <= 0) {
			return [this.x, this.y];
		} else {
			return [this.x + this._stepX * steps, this.y + this._stepY * steps];
		}
	}

    //计一步走的距离
    protected _computeSteps(x1:number, y1:number, x2:number, y2:number): boolean {
		this._steps = 0;
		
	    let dx = Math.abs(x1 - x2);
	    let dy = Math.abs(y1 - y2);
	    if (dx >= dy) {
	    	this._totalSteps = Math.floor(dx / this._moveSpeed);
	    } else {
	    	this._totalSteps = Math.floor(dy / this._moveSpeed);
	    }
	    
	    if (this._totalSteps > 0) {
	        this._stepX = dx / this._totalSteps;
	        if (x2 < x1) {
	            this._stepX = 0 - this._stepX;
	        }
	        
	        this._stepY = dy / this._totalSteps;
	        if (y2 < y1) {
	            this._stepY = 0 - this._stepY;
	        }
	
			return true;
	    } else {
	    	return false;
	    }
    }
    
    protected _idle() {
    	this._ticks ++;
    	if (this._ticks >= this._idleTicks) {
            if (this._displays.has(EntityState.building)) {
        	    this.build();
            } else {
                this.move();
            }
    	}
    }
    
    protected _dying() {
    	this._ticks ++;
        if (this._ticks >= this._dyingTicks) {
            this.erase();
        }
    }    
}
