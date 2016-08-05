enum ObjectState {
    idle,
    building,
    moving,
    guarding,
    fighting,
    dying,
    dead
};

enum ObjectDirection {
    north,
    northeast,
    east,
    southeast,
    south,
    southwest,
    west,
    northwest
};

class Object extends egret.Sprite {
	private _state: ObjectState;
	private _ticks: number;
    
    //面向
    private _direction: ObjectDirection;

    public constructor() {
        super();
        
        this._direction = ObjectDirection.east;
        this._do(ObjectState.idle);
	}
	
	public intersect(x: number, y: number, radius: number):boolean {
		let dx = this.x - x;
		let dy = this.y - y;
		return (dx * dx + dy * dy <= radius * radius);
	}
	
	public collide(obj: Object) {
		return !(obj.x > this.x + this.width || 
           obj.x + obj.width < this.x || 
           obj.y > this.y + this.height ||
           obj.y + obj.height < this.y);		
	}
	
	public dead(): boolean {
		return this._state == ObjectState.dead;
	}
	
	public dying(): boolean {
		return this._state == ObjectState.dying;
	}
    
    public match(options: any): boolean {
    	return false;
    }
	
	/**初始化*/
    public initialize(options: any):void {
    }
    
    /**更新状态*/
    public update(ticks:number):void {
    	this._ticks++;
    	
    	switch(this._state) {
		    case ObjectState.idle:
		    	this._idle();
		    	break;
		    	
		    case ObjectState.building:
		    	this._building();
		    	break;
		    	
   	    	case ObjectState.moving:
		    	this._moving();
		    	break;
		    	
		    case ObjectState.guarding:
		    	this._guarding();
		    	break;

   	    	case ObjectState.fighting:
		    	this._fighting();
		    	break;
		    	
   	    	case ObjectState.dying:
		    	this._dying();
		    	break;
    	}
    }
    
    private _do(state:ObjectState) {
    	if (state != this._state) {
	    	this._stateChanged( this._state, state);
	    	
	    	this._ticks = 0;
	    	this._state = state;
	    	
	    	this._render();
    	}
    }
    
    private _turn(direction: ObjectDirection) {
    	if (direction != this._direction) {
    		this._direction = direction;
    		
    		this._render();
    	}
    }
    
    protected _stateChanged(oldState: ObjectState, newState: ObjectState) {
    }
    
    //根据状态、面向修改重新渲染
    protected _render() {
    	egret.MovieClip mc = application.characters[egret.getQualifiedClassName(this)].getMC(this._direction, this._state);
    	
    	this.removeChildren();
    	this.addChild(mc);
    	
    	mc.start();
    }
    
    protected _idle()) {
    }
    
    protected _building() {
    }

    protected _moving() {
    }

    protected _guarding() {
    }
    
    protected _fighting() {
    }
    
    protected _dying() {
    }
    
    private _direction8(x:number, y:number):ObjectDirection {
        let angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        let directions = [ObjectDirection.east, ObjectDirection.northeast, ObjectDirection.north, ObjectDirection.northwest, ObjectDirection.west, ObjectDirection.southwest, ObjectDirection.south, ObjectDirection.southeast, ObjectDirection.east ];
        
        return _directionOf(x, y, angels, directions);
    }
    
    private _direction4(x:number, y:number):ObjectDirection {
        let angels = [60, 120, 240, 300, 360];
        let directions = [ObjectDirection.east, ObjectDirection.north, ObjectDirection.west, ObjectDirection.south, ObjectDirection.east ];
        
        return _directionOf(x, y, angels, directions);
    }
    
    private _directionOf(x:number, y:number, angels:number[], directions:ObjectDirection[]):ObjectDirection {
        let dx: number = x - this.x;
        let dy: number = y - this.y;
        let angel = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        for(let i = 0; i < angels.length; i++) {
        	if (angel <= angels[i]) {
        		return directions[i];
        	}
        }
    }
    
    private _steps(x:number, y:number, step:number):number[] {
	    let stepX = 0;
	    let stepY = 0;
	    
	    let dx = Math.abs(this.x - x);
	    let dy = Math.abs(this.y - y);
	    if (dx >= dy) {
	        stepX = step;
	        if (x < this.x) {
	            stepX = 0 - stepX;
	        }
	        
	        stepY = dy / (dx / stepX);
	        if (y < this.y) {
	            stepY = 0 - stepY;
	        }
	    } else {
	         stepY = step;
	        if (y < this.y) {
	            stepY = 0 - stepY;
	        }
	        
	        stepX = dx / (dy / stepY);
	        if (x < this.x) {
	            stepX = 0 - stepX;
	        }                   
	    }
	    
	   	return [stepX, stepY];
    }
}
