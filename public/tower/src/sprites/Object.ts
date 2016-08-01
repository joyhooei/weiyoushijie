class Object extends egret.Sprite {
    public constructor() {
        super();
	}
	
	/**创建*/
    public onCreate():void {
    }
    
    /**销毁*/
    public onDestroy():void {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    }
    
    /**更新状态*/
    public update():void {
    }	
    
    /**显示*/
    public paint():void {
    }	    
}
