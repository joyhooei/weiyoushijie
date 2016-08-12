class BattleTimeoutToolItem extends BattleToolItem {
    private _ticks: number;
    
    private _maxTicks: number;
    
    public imgShield: eui.Image;
    
    public constructor(tool:any) {
        super(tool);
        
        this._ticks = 0;
        this._maxTicks = 10;
        
        this.imgShield.height = 0;
        
        if (tool.category == "solider") {
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
        if (tool.category == "solider") {
            let solider = <Solider>application.tool.get("Solider", {guardX: x, guardY: y);
            solider.x = x;
            solider.y = y;
            application.battle.addSolider(solider);
        } else if (tool.category == "fireball") {
            let bullet = <Bullet>application.tool.get("Fireball");
            
            let emptyEnemy = <Enemy>application.tool.get("EmptyEnemy");
            emptyEnemy.x = x;
            emptyEnemy.y = y;
            application.battle.addEnemy(emptyEnemy);
            
            bullet.x = this.parent.x;
            bullet.y = this.parent.y;
            bullet.setTarget(emptyEnemy);
            application.battle.addBullet(bullet);
        }
        
        this._ticks = this._maxTicks;
    }
}
