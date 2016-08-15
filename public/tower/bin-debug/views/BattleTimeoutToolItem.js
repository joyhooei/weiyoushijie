var BattleTimeoutToolItem = (function (_super) {
    __extends(BattleTimeoutToolItem, _super);
    function BattleTimeoutToolItem(tool) {
        var _this = this;
        _super.call(this, tool);
        this._ticks = 0;
        this._maxTicks = 10;
        this.imgShield.height = 0;
        if (tool.category == "solider") {
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
        if (this._tool.category == "solider") {
            var solider = application.pool.get("Solider", { guardX: x, guardY: y });
            solider.x = x;
            solider.y = y;
            application.battle.addSolider(solider);
        }
        else if (this._tool.category == "fireball") {
            var bullet = application.pool.get("Fireball");
            var emptyEnemy = application.pool.get("EmptyEnemy");
            emptyEnemy.x = x;
            emptyEnemy.y = y;
            application.battle.addEnemy(emptyEnemy);
            bullet.x = this.parent.x;
            bullet.y = this.parent.y;
            bullet.setTarget(emptyEnemy);
            application.battle.addBullet(bullet);
        }
        this._ticks = this._maxTicks;
    };
    return BattleTimeoutToolItem;
}(BattleToolItem));
egret.registerClass(BattleTimeoutToolItem,'BattleTimeoutToolItem');
//# sourceMappingURL=BattleTimeoutToolItem.js.map