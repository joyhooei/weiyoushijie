class LaunchTip extends Tip {
    private _shapeShield: egret.Shape;

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
        
        this._wave = this._get(properties, "wave", 0);
    }

    public select(again:boolean) {
        application.battle.launchWave(this._wave);
        
        let gold = Math.round(40 * (this._dyingTicks - this._ticks) / this._dyingTicks);
        application.battle.incGolds(gold);
        
        this.erase();
    }
    
    protected _dying() {
        if (this._ticks > this._dyingTicks) {
            application.battle.launchWave(this._wave);
            
            this.erase();
        } else {
            if (this._ticks % 3 == 0) {
                this.stain();
            }
        }
        
        this._ticks ++;
    }
    
    public paint() {
        super.paint();

    	this._shapeShield.graphics.clear();
    	this._shapeShield.graphics.lineStyle(2, 0xff0000);
    	this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, 0,  (2 * this._ticks / this._dyingTicks) * Math.PI, false);
    	this._shapeShield.graphics.endFill(); 
    }
}
