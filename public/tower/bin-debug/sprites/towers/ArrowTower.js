var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.call(this);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        for (var i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].erase();
        }
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        for (var i = 0; i < this._soldiers.length; i++) {
            this.addChild(this._soldiers[i]);
        }
    };
    p._createSoliders = function (className) {
        this._soldiers.push(this._createSoldier(className, 36, 15));
        this._soldiers.push(this._createSoldier(className, 50, 15));
    };
    p._createSoldier = function (className, x, y) {
        var soldier = application.pool.get(className, { "guardX": this.getMapX(), "guardY": this.getMapY(), "guardRadius": this._guardRadius });
        soldier.x = x;
        soldier.y = y;
        return soldier;
    };
    p.update = function () {
        for (var i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].update();
        }
        return _super.prototype.update.call(this);
    };
    return ArrowTower;
}(Tower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map