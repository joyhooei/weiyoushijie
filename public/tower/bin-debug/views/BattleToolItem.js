var BattleToolItem = (function (_super) {
    __extends(BattleToolItem, _super);
    function BattleToolItem(tool) {
        var _this = this;
        _super.call(this, "toolItemSkin");
        this._tool = tool;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.battle.readyUseTool(_this);
        }, this);
        if (tool.category == "bomb") {
            this.imgTool.source = "";
        }
        else if (tool.category == "gold") {
            this.imgTool.source = "";
        }
    }
    var d = __define,c=BattleToolItem,p=c.prototype;
    p.use = function (x, y) {
        this._tool.count -= 1;
        application.dao.save("Tool", this._tool);
        if (this._tool.category == "bomb") {
        }
        else if (this._tool.category == "gold") {
        }
        if (this._tool.count <= 0) {
            this.parent.removeChild(this);
        }
    };
    return BattleToolItem;
}(AbstractUI));
egret.registerClass(BattleToolItem,'BattleToolItem');
//# sourceMappingURL=BattleToolItem.js.map