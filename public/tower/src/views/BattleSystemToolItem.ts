class BattleSystemToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    private _shapeShield: eui.Shape;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 10;
        
        this._shapeShield= new egret.Shape();
        this.addChild(this._shapeShield);
        
        if (tool.category == "soldier") {
        	this.imgTool.source = "tool_soldier_png";
        } else if (tool.category == "fireball") {
        	this.imgTool.source = "tool_fireball_png";
        }
        
		application.stopwatch.addEventListener("second", function(event:egret.Event){
		    if (this._ticks > 0) {
		        this._ticks --;
		    }
		    
		    this._drawProgress(this._shapeShield, this.width / 2, this.height / 2, this.width / 2, this._ticks, this._maxTicks);
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
    
    private _drawProgress(graphics: egret.Graphics, x: number, y: number, radius: number, percent:number, total:number) {
    	graphics.beginFill(0xff0000, 0.1);
    	graphics.drawArc(x, y, radius, -0.5 * Math.PI, ((percent / total) - 0.5) * Math.PI, false);
    	graphics.endFill();
    }
}
