var BattleSystemToolItem = (function (_super) {
    __extends(BattleSystemToolItem, _super);
    function BattleSystemToolItem(tool) {
        var _this = this;
        _super.call(this, tool);
        this._ticks = 0;
        this._maxTicks = 15;
        this._shapeShield = new egret.Shape();
        this._shapeShield.width = this.width;
        this._shapeShield.height = this.height;
        this.addChild(this._shapeShield);
        this.imgTool.source = tool.image;
        application.stopwatch.addEventListener("second", function (event) {
            if (this._ticks < this._maxTicks) {
                this._ticks++;
            }
            this._drawProgress(this._ticks, this._maxTicks);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._ticks == _this._maxTicks) {
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
        this._ticks = 0;
    };
    p._drawProgress = function (percent, total) {
        var x = this.width / 2;
        var y = this.height / 2;
        var r = this.height / 2 - 5;
        this._shapeShield.graphics.clear();
        this._shapeShield.graphics.beginFill(0x000000, 0.3);
        this._shapeShield.graphics.moveTo(x, y);
        this._shapeShield.graphics.lineTo(x, y - 2 * r);
        this._shapeShield.graphics.drawArc(x, y, r, ((2 * percent / total) - 0.5) * Math.PI, 1.5 * Math.PI, false);
        this._shapeShield.graphics.lineTo(x, y);
        this._shapeShield.graphics.endFill();
    };
    return BattleSystemToolItem;
}(BattleToolItem));
egret.registerClass(BattleSystemToolItem,'BattleSystemToolItem');
//# sourceMappingURL=BattleSystemToolItem.js.map