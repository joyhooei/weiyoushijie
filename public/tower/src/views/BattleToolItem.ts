class BattleToolItem extends AbstractUI {
    protected _tool: any;
    
    public imgTool: eui.Image;
	public lblCount: eui.Label;

    public constructor(tool:any) {
        super("battleToolItemSkin");
        
        this._tool = tool;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._tool.count > 0) {
				if (this._tool.category == "nectar" || this._tool.category == "mammon"){
					this.use(applicaton.battle.getCenterX(), application.battle.getCenterY());
				} else {
					application.battle.readyUseTool(this);
				}
			}
		}, this);
    }

	protected onRefresh() {
		this.imgTool.source = this._tool.category + "_png";
		this.lblCount.text = this._too.count.toString();
	}
    
    public use(x:number, y:number) {
        this._tool.count = Math.max(0, this._tool.count - 1);
		application.dao.save("Tool", this._tool);
        
        if (tool.category == "nectar") {
			application.battle.incLives(5);
        } else if (tool.category == "frezze") {
			Bullet.shoot(x, y - 200, x, y, "Frezze");
        } else if (tool.category == "thunder") {
			Bullet.shoot(x, y - 200, x, y, "Thunder");
        } else if (tool.category == "mammon") {
			application.battle.incGolds(500);
        }
        
        this.lblCount.text = this._tool.count.toString();
    }
}
