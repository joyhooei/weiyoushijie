class MovableEntity extends Entity {
    //一步走多远
    private _step: number;
    
    //一步走的距离    
    private _steps: number[];
    
    public constructor() {
        super();
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
