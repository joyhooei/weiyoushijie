class LaunchTip extends Tip {
    private _shapeShield: egret.Shape;

    private _queue: number;

    private _wave: number;
    
    public constructor() {
        super();

        this.touchEnabled = true;
        
        this.addBitmap("launch_png");
        
        this._shapeShield= new egret.Shape();
        this.addChild(this._shapeShield);
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._queue = this._get(properties, "queue", 0);
        this._wave = this._get(properties, "wave", 0);
    }

    public select(again:boolean) {
        if (again) {
            this.erase();

            application.battle.launch(this._wave, this._queue);
        } else {
            Toast.launch("再次点击开始下一波");
        }
    }
    
    protected _dying() {
        this._ticks ++;
        if (this._ticks > this._dyingTicks) {
            this.erase();

            application.battle.launch(this._wave, this._queue);
        }
    }
    
    public paint() {
    	this._shapeShield.graphics.clear();
    	this._shapeShield.graphics.lineStyle(2, 0xffff00);
    	this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, 0,  (2 * this._ticks / this._dyingTicks) * Math.PI, false);
    	this._shapeShield.graphics.endFill(); 
    }
}
