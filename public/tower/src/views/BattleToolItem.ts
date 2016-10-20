class BattleToolItem extends AbstractUI {
    public imgTool: eui.Image;
	public lblCount: eui.Label;

    protected _tool: any;
    
    protected _ticks: number;
    
    protected _maxTicks: number;
    
    protected _shapeShield: egret.Shape;

    public constructor(tool:any) {
        super("battleToolItemSkin");
        
        this._tool = tool;
		
        this._ticks = 0;
        this._maxTicks = 30;
		
		this._shapeShield = null;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._tool.count > 0 && this._ticks == this._maxTicks) {
				if (this._tool.category == "nectar" || this._tool.category == "mammon"){
					this.use(application.battle.getCenterX(), application.battle.getCenterY());
				} else {
					application.battle.readyUseTool(this);
				}
			}
		}, this);
		
		application.stopwatch.addEventListener("second", function(event:egret.Event){
		    if (this._ticks < this._maxTicks) {
		        this._ticks ++;
		    }
		    
		    this._drawProgress(this._ticks, this._maxTicks);
		}, this);
    }

	protected onRefresh() {
		this.imgTool.source = this._tool.category + "_png";
		this.lblCount.text = this._tool.count.toString();
	}
    
    public use(x:number, y:number) {
        this._tool.count = Math.max(0, this._tool.count - 1);
		application.dao.save("Tool", this._tool);
        
        if (this._tool.category == "nectar") {
			application.battle.incLives(5);
        } else if (this._tool.category == "freeze") {
			Bullet.shoot(x, y, x, y, "Freeze");
        } else if (this._tool.category == "thunder") {
			Bullet.shoot(x, y, x, y, "Thunder");
        } else if (this._tool.category == "mammon") {
			application.battle.incGolds(500);
        }
        
        this.lblCount.text = this._tool.count.toString();
        
        this._ticks = 0;
    }

    protected _drawProgress(percent:number, total:number) {
		if (!this._shapeShield) {
			this._shapeShield= new egret.Shape();
			this._shapeShield.width = this.width;
			this._shapeShield.height = this.height;
			this.addChild(this._shapeShield);
		}        
			
        let x = this.width / 2;
        let y = this.height / 2;
        let r = this.height / 2 - 5;

    	this._shapeShield.graphics.clear();
    	this._shapeShield.graphics.beginFill(0x000000, 0.3);
        this._shapeShield.graphics.moveTo(x, y);
        this._shapeShield.graphics.lineTo(x, y - 2 * r);
    	this._shapeShield.graphics.drawArc(x, y, r, ((2 * percent / total) - 0.5) * Math.PI, 1.5 * Math.PI, false);
        this._shapeShield.graphics.lineTo(x, y);
    	this._shapeShield.graphics.endFill();
    }
}
