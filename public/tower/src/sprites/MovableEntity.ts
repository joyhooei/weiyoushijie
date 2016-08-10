class MovableEntity extends Entity {
    //一步走多远
    protected _step: number;
    
    //一步走的距离    
    protected _steps: number[];
    
    public constructor() {
        super();

		this._step = 10;
		this._steps = [10, 10];
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._step     = properties.steep;
    }
    
    protected _idle() {
        this._do(EntityState.moving);
    }

    protected _moveOneStep(): boolean {
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
