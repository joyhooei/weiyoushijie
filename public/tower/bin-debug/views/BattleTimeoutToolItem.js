var BattleTimeoutToolItem = (function (_super) {
    __extends(BattleTimeoutToolItem, _super);
    function BattleTimeoutToolItem(tool) {
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
    var d = __define,c=BattleTimeoutToolItem,p=c.prototype;
    p.use = function (x, y) {
        if (this._tool.category == "soldier") {
            var soldier = application.pool.get("Soldier", { guardX: x - 5, guardY: y - 5 });
            soldier.x = x;
            soldier.y = y;
            application.battle.addSoldier(soldier);
            soldier = application.pool.get("Soldier", { guardX: x + 5, guardY: y + 5 });
            soldier.x = x;
            soldier.y = y;
            application.battle.addSoldier(soldier);
        }
        else if (this._tool.category == "fireball") {
            var emptyEnemy = application.pool.get("EmptyEnemy");
            emptyEnemy.x = x;
            emptyEnemy.y = y;
            Bullet.shoot(x, y - 200, emptyEnemy, "Fireball");
        }
        this._ticks = this._maxTicks;
    };
    return BattleTimeoutToolItem;
}(BattleToolItem));
egret.registerClass(BattleTimeoutToolItem,'BattleTimeoutToolItem');
//# sourceMappingURL=BattleTimeoutToolItem.js.map