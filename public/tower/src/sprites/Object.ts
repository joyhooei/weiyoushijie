enum ObjectState {
    idle,
    moving,
    fighting,
    dying,
    dead
};

class Object extends egret.Sprite {
	private _state: ObjectState;
	private _ticks: number;

    public constructor() {
        super();
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
		    	this._idle();
		    	break;
		    	
   	    	case ObjectState.moving,
		    	this._moving();
		    	break;

   	    	case ObjectState.fighting,
		    	this._fighting();
		    	break;
		    	
   	    	case ObjectState.dying,
		    	this._dying();
		    	break;
    	}
    }
    
    protected _idle() {
    	
    }

    protected _moving() {
    	
    }
    
    protected _fighting() {
    	
    }
    
    protected _dying() {
    	
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
