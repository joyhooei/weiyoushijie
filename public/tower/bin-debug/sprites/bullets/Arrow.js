var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        _super.call(this);
    }
    var d = __define,c=Arrow,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._missing = false;
    };
    p._hitTarget = function () {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
        }
        else {
            this._target.hitBy(this._damage);
        }
    };
    return Arrow;
}(CastBullet));
egret.registerClass(Arrow,'Arrow');
//# sourceMappingURL=Arrow.js.map