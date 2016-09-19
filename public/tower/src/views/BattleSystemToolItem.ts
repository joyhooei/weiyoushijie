class BattleSystemToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    private _shapeShield: eui.Shape;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 10 * application.frameRate;
        
        this._shapeShield= new egret.Shape();
        this.addChild(this._shapeShield);

        this.imgTool.source = tool.image;
        
		application.stopwatch.addEventListener("second", function(event:egret.Event){
		    if (this._ticks > 0) {
		        this._ticks --;
		    }
		    
		    this._drawProgress(this._ticks, this._maxTicks);
		}, this);
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    if (this._ticks == 0) {
		        application.battle.readyUseTool(this);
		    }
		}, this);		
    }
    
    public use(x: number, y: number) {
        if (this._tool.category == "soldier") {
            let soldier = <Soldier>application.pool.get("Reinforce", {guardX: x - 10, guardY: y - 10});
            soldier.setCenterX(x);
            soldier.setBottomY(y);
            application.battle.addSoldier(soldier);

            soldier = <Soldier>application.pool.get("Reinforce", {guardX: x + 10, guardY: y + 10});
            soldier.setCenterX(x);
            soldier.setBottomY(y);
            application.battle.addSoldier(soldier);            
        } else if (this._tool.category == "fireball") {
        	Bullet.shoot(x, y - 200, x, y, "Fireball");
        }
        
        this._ticks = this._maxTicks;
    }
    
    private _drawProgress(percent:number, total:number) {
    	this._shapeShield.graphics.clear();
    	this._shapeShield.graphics.beginFill(0x000000, 0.1);
    	this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, ((2 * percent / total) - 0.5) * Math.PI, 1.5 * Math.PI, false);
    	this._shapeShield.graphics.endFill();
    }
}
