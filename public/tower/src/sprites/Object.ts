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

    /**打击效果*/
    public onHit():void {
    }
    
    /**帧事件*/
    public onEnterFrame(tick:number):void {
    }	
}
