class BattleTimeoutToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    public imgShield: eui.Image;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 10;
        
        this.imgShield.height = 0;
        
        if (tool.category == "soldier") {
        	this.imgTool.source = "";
        } else if (tool.category == "fireball") {
        	this.imgTool.source = "";
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
            let soldier = <Soldier>application.pool.get("Soldier", {guardX: x - 5, guardY: y - 5});
            soldier.x = x;
            soldier.y = y;
            application.battle.addSoldier(soldier);
            
            soldier = <Soldier>application.pool.get("Soldier", {guardX: x + 5, guardY: y + 5});
            soldier.x = x;
            soldier.y = y;
            application.battle.addSoldier(soldier);            
        } else if (this._tool.category == "fireball") {
            let emptyEnemy = <Enemy>application.pool.get("EmptyEnemy");
            emptyEnemy.x = x;
            emptyEnemy.y = y;
        	Bullet.shoot(x, y - 200, emptyEnemy, "Fireball");
        }
        
        this._ticks = this._maxTicks;
    }
}
