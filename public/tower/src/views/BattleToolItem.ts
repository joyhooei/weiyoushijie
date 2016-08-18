class BattleToolItem extends AbstractUI {
    protected _tool: any;
    
    public imgTool: eui.Image;

    public constructor(tool:any) {
        super("battleToolItemSkin");
        
        this._tool = tool;
        
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    application.battle.readyUseTool(this);
		}, this);
		
        if (tool.category == "bomb") {
        	this.imgTool.source = "";
        } else if (tool.category == "gold") {
        	this.imgTool.source = "";
        }
    }
    
    public use(x:number, y:number) {
        this._tool.count -= 1;
        application.dao.save("Tool", this._tool);
        
        if (this._tool.category == "bomb") {
        } else if (this._tool.category == "gold") {
        }
        
        if (this._tool.count <= 0) {
            this.parent.removeChild(this);
        }
    }
}
