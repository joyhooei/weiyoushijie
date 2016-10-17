class BattleSystemToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    private _shapeShield: egret.Shape;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 15;
        
        this._shapeShield= new egret.Shape();
        this._shapeShield.width = this.width;
        this._shapeShield.height = this.height;
        this.addChild(this._shapeShield);

        this.imgTool.source = tool.image;
        
		application.stopwatch.addEventListener("second", function(event:egret.Event){
		    if (this._ticks < this._maxTicks) {
		        this._ticks ++;
		    }
		    
		    this._drawProgress(this._ticks, this._maxTicks);
		}, this);
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    if (this._ticks == this._maxTicks) {
		        application.battle.readyUseTool(this);
		    }
		}, this);

        this.lblCount.visible = false;
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
        
        this._ticks = 0;
    }
    
    private _drawProgress(percent:number, total:number) {
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
