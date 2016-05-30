class BlockUI extends egret.Sprite {
    public constructor() {
        super();
		
		this.width  = 400;
		this.height = 640;
		
		this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0, 0, 400, 640);
        this.graphics.endFill();
		
		this.alpha = 0.2;
		
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, function(){
			application.hideUI(this);
		}, this);
    }
}