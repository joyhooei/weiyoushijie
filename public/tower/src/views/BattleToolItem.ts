class BattleToolItem extends AbstractUI {
    private _tool: any;
    
    public imgTool: eui.Image;

    public constructor(tool:any) {
        super("toolItemSkin");
        
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
    
    public use() {
        this._tool.count -= 1;
        application.dao.save("Tool", this._tool);
        
        if (tool.category == "bomb") {
        } else if (tool.category == "gold") {
        }
        
        if (this._tool.count <= 0) {
            this.parent.removeChild(this);
        }
    }
}
