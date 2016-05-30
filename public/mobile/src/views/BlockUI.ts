class BlockUI extends egret.Sprite {
    public constructor(ui:egret.Component) {
        super();
		
		this.width  = 400;
		this.height = 640;
		
		this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0, 0, 400, 640);
        this.graphics.endFill();
		
		this.alpha = 0.2;
		
        ui.horizontalCenter = 0;
        ui.verticalCenter   = 0;
		this.addChild(ui);
		
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_END, function(){
			application.hideUI(ui);
		}, this);
    }
}