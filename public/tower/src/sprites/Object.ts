class Object extends egret.Sprite {
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
