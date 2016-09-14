class BattleSystemToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    public imgShield: eui.Image;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 10;
        
        this.imgShield.height = 0;
        
        if (tool.category == "soldier") {
        	this.imgTool.source = "tool_soldier_png";
        } else if (tool.category == "fireball") {
        	this.imgTool.source = "tool_fireball_png";
        }
        
		application.stopwatch.addEventListener("second", function(event:egret.Event){
		    if (this._ticks > 0) {
		        this._ticks --;
		    }
		    
		    this.imgShield.height = this.imgTool.height * this._ticks / this._maxTicks;
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
}
