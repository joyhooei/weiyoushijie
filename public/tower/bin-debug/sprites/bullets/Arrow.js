var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Arrow,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._missing = false;
    };
    p._hitTarget = function () {
        if (this._target.active()) {
            this._target.shootBy(this);
        }
        else {
            this._missing = true;
        }
    };
    p._fighting = function () {
        if (this._missing) {
            _super.prototype._fighting.call(this);
        }
        else {
            this.erase();
        }
    };
    p._moveOneStep = function () {
        var dx = this.x - this._startX;
        var dy = this._startY - this.y;
        this.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
        return _super.prototype._moveOneStep.call(this);
    };
    return Arrow;
}(CastBullet));
egret.registerClass(Arrow,'Arrow');
//# sourceMappingURL=Arrow.js.map