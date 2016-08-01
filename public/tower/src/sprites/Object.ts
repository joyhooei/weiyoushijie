enum ObjectState {
    idle,
    moving,
    moveEnd,
    fighting,
    fightEnd,
    dying,
    dead
};

class Object extends egret.Sprite {
	private _state: ObjectState;
	
    public constructor() {
        super();
	}
	
	/**创建*/
    public create():void {
    }
    
    /**更新状态*/
    public update():void {
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
