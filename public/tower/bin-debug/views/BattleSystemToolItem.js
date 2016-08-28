var BattleSystemToolItem = (function (_super) {
    __extends(BattleSystemToolItem, _super);
    function BattleSystemToolItem(tool) {
        var _this = this;
        _super.call(this, tool);
        this._ticks = 0;
        this._maxTicks = 10;
        this.imgShield.height = 0;
        if (tool.category == "soldier") {
            this.imgTool.source = "";
        }
        else if (tool.category == "fireball") {
            this.imgTool.source = "";
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
            application.battle.addSoldier(application.pool.get("Soldier1", { guardX: x - 5, guardY: y - 5, x: x, y: y }));
            application.battle.addSoldier(application.pool.get("Soldier1", { guardX: x + 5, guardY: y + 5, x: x, y: y }));
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