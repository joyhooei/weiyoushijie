enum ObjectState {
    idle,
    moving,
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

    public constructor() {
        super();
        
        this._state = ObjectState.idle;
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
    
    public match(options: any): boolean {
    	return false;
    }
	
	/**初始化*/
    public initialize(options: any):void {
    }
    
    /**更新状态*/
    public update(ticks:number):void {
    	switch(this._state) {
		    case ObjectState.idle:
		    	this._idle(ticks);
		    	break;
		    	
   	    	case ObjectState.moving,
		    	this._moving(ticks);
		    	break;

   	    	case ObjectState.fighting,
		    	this._fighting(ticks);
		    	break;
		    	
   	    	case ObjectState.dying,
		    	this._dying(ticks);
		    	break;
    	}
    }
    
    protected _idle(ticks:number) {
    }

    protected _moving(ticks:number) {
    }
    
    protected _fighting(ticks:number) {
    }
    
    protected _dying(ticks:number) {
    }
    
    private _direction(x:number, y:number):ObjectDirection {
        let dx: number = x - this.x;
        let dy: number = y - this.y;
        let angel = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        let angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        let directions = [ObjectDirection.east, ObjectDirection.northeast, ObjectDirection.north, ObjectDirection.northwest, ObjectDirection.west, ObjectDirection.southwest, ObjectDirection.south, ObjectDirection.southeast, ObjectDirection.east ];
        for(let i = 0; i < angels.length; i++) {
        	if (angel <= angels[i]) {
        		return directions[i];
        	}
        }
    }
    
    /**显示*/
    public paint():void {
    }
    
    /**销毁*/
    public destroy():void {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    }
}
