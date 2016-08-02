enum ObjectState {
    idle,
    moving,
    stand,
    fighting,
    dying,
    dead
};

class Object extends egret.Sprite {
	private _state: ObjectState;

    public constructor() {
        super();
	}
	
	public intersect(x: number, y: number, radius: number):boolean {
		return !(x - radius > this.x + this.width || 
           x + radius < this.x || 
           y - radius > this.y + this.height ||
           y + radius < this.y);
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
