var BattleSystemToolItem = (function (_super) {
    __extends(BattleSystemToolItem, _super);
    function BattleSystemToolItem(tool) {
        var _this = this;
        _super.call(this, tool);
        this._ticks = 0;
        this._maxTicks = 10;
        this.imgShield.height = 0;
        if (tool.category == "soldier") {
            this.imgTool.source = "tool_soldier_png";
        }
        else if (tool.category == "fireball") {
            this.imgTool.source = "tool_fireball_png";
        }
        application.stopwatch.addEventListener("second", function (event) {
            if (this._ticks > 0) {
                this._ticks--;
            }
            this.imgShield.height = this.imgTool.height * this._ticks / this._maxTicks;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._ticks == 0) {
                application.battle.readyUseTool(_this);
            }
        }, this);
    }
    var d = __define,c=BattleSystemToolItem,p=c.prototype;
    p.use = function (x, y) {
        if (this._tool.category == "soldier") {
            var soldier = application.pool.get("Reinforce", { guardX: x - 10, guardY: y - 10 });
            soldier.setCenterX(x);
            soldier.setBottomY(y);
            application.battle.addSoldier(soldier);
            soldier = application.pool.get("Reinforce", { guardX: x + 10, guardY: y + 10 });
            soldier.setCenterX(x);
            soldier.setBottomY(y);
            application.battle.addSoldier(soldier);
        }
        else if (this._tool.category == "fireball") {
            Bullet.shoot(x, y - 200, x, y, "Fireball");
        }
        this._ticks = this._maxTicks;
    };
    return BattleSystemToolItem;
}(BattleToolItem));
egret.registerClass(BattleSystemToolItem,'BattleSystemToolItem');
//# sourceMappingURL=BattleSystemToolItem.js.map