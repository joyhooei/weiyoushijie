var BattleToolItem = (function (_super) {
    __extends(BattleToolItem, _super);
    function BattleToolItem(tool) {
        var _this = this;
        _super.call(this, "battleToolItemSkin");
        this._tool = tool;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._tool.count > 0) {
                if (_this._tool.category == "nectar" || _this._tool.category == "mammon") {
                    _this.use(application.battle.getCenterX(), application.battle.getCenterY());
                }
                else {
                    application.battle.readyUseTool(_this);
                }
            }
        }, this);
    }
    var d = __define,c=BattleToolItem,p=c.prototype;
    p.onRefresh = function () {
        this.imgTool.source = this._tool.category + "_png";
        this.lblCount.text = this._tool.count.toString();
    };
    p.use = function (x, y) {
        this._tool.count = Math.max(0, this._tool.count - 1);
        application.dao.save("Tool", this._tool);
        if (this._tool.category == "nectar") {
            application.battle.incLives(5);
        }
        else if (this._tool.category == "frezze") {
            Bullet.shoot(x, y, x, y, "Frezze");
        }
        else if (this._tool.category == "thunder") {
            Bullet.shoot(x, y, x, y, "Thunder");
        }
        else if (this._tool.category == "mammon") {
            application.battle.incGolds(500);
        }
        this.lblCount.text = this._tool.count.toString();
    };
    return BattleToolItem;
}(AbstractUI));
egret.registerClass(BattleToolItem,'BattleToolItem');
//# sourceMappingURL=BattleToolItem.js.map