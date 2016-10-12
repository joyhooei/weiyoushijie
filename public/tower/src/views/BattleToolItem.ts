class BattleToolItem extends AbstractUI {
    protected _tool: any;
    
    public imgTool: eui.Image;
	public lblCount: eui.Label;

    public constructor(tool:any) {
        super("battleToolItemSkin");
        
        this._tool = tool;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._tool.attrs.count > 0) {
				if (this._tool.attr.category == "nectar" || this._tool.attr.category == "mammon"){
					this.use(0, 0);
				} else {
					application.battle.readyUseTool(this);
				}
			}
		}, this);
    }

	protected onRefresh() {
		this.imgTool.source = this._tool.attr.category + "_png";
		this.lblCount.text = this._too.attrs.count.toString();
	}
    
    public use(x:number, y:number) {
        this._tool.attrs.count -= 1;
        this._tool.save();
        
        if (tool.category == "nectar") {
			application.battle.incLives(5);
        } else if (tool.category == "frezze") {
			Bullet.shoot(x, y - 200, x, y, "Frezze");
        } else if (tool.category == "thunder") {
			Bullet.shoot(x, y - 200, x, y, "Thunder");
        } else if (tool.category == "mammon") {
			application.battle.incGolds(500);
        }
        
        this.lblCount.text = this._too.attrs.count.toString();
    }
}
