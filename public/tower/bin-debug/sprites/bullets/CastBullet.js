var CastBullet = (function (_super) {
    __extends(CastBullet, _super);
    function CastBullet() {
        _super.call(this);
    }
    var d = __define,c=CastBullet,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._flyHeight = this._get(properties, 'flyHeight', 25);
        this._gravity = this._get(properties, 'gravity', 1);
        this._flyTicks = 0;
    };
    p._idle = function () {
        this._initX = this.x;
        this._initY = this.y;
        _super.prototype._idle.call(this);
    };
    p._computeSteps = function (x, y) {
        this._stepX = (x - this._initX) / this._flyHeight;
        this._stepY = ((y - this._initY) - (this._gravity * this._flyHeight * this._flyHeight / 2)) / this._flyHeight;
        return this._stepX != 0 && this._stepY != 0;
    };
    p._moveOneStep = function () {
        this._flyTicks += 0.5;
        this.x = this._initX + this._flyTicks * this._stepX;
        this.y = this._initY + this._flyTicks * this._stepY + this._gravity * this._flyTicks * this._flyTicks / 2;
        this._flyTicks += 0.5;
        var sx = this._initX + this._flyTicks * this._stepX;
        var sy = this._initY + this._flyTicks * this._stepY + this._gravity * this._flyTicks * this._flyTicks / 2;
        var dx = sx - this.x;
        var dy = sy - this.y;
        this._flyTicks -= 0.5;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        if (angle > 180 && angle < 360) {
            var disx = this.x - this._target.x < 0 ? this._target.x - this.x : this.x - this._target.x;
            var disy = this.y - this._target.y < 0 ? this._target.y - this.y : this.y - this._target.y;
            if (disx <= this._stepX && disy < this._stepY) {
                return true;
            }
        }
        return false;
    };
    return CastBullet;
}(Bullet));
egret.registerClass(CastBullet,'CastBullet');
//# sourceMappingURL=CastBullet.js.map