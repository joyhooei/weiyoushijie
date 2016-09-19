class LaunchTip extends Tip {
    private _shapeShield: eui.Shape;
    
    public constructor() {
        super();

        this.touchEnabled = true;
        
        this.addBitmap("launch_png");
        
        this._shapeShield= new egret.Shape();
        this.addChild(this._shapeShield);
    }

    public select(again:boolean) {
        if (again) {
            this.erase();
        } else {
            Toast.launch("再次点击开始下一波");
        }
    }
    
    protected _dying() {
        super._dying();
        
        this.stain();
    }
    
    public erase() {
        super.erase();
        
        application.battle.launchNow();
    }
    
    public paint() {
    	this._shapeShield.graphics.clear();
    	this._shapeShield.graphics.lineStyle(2, 0xffff00);
    	this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, 0,  (2 * this._ticks / this._dyingTicks) * Math.PI, false);
    	this._shapeShield.graphics.endFill(); 
    }
}
