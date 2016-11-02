//https://github.com/amibug/fly/blob/master/src/fly.js
var CastBullet = (function (_super) {
    __extends(CastBullet, _super);
    function CastBullet() {
        _super.call(this);
    }
    var d = __define,c=CastBullet,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._startX = 0;
        this._startY = 0;
        this._a = 0;
        this._b = 0;
        this._c = 0;
    };
    p._computeSteps = function (x, y, targetX, targetY) {
        this._startX = x;
        this._startY = y;
        this._targetX = targetX;
        this._targetY = targetY;
        if (this._targetX > this._startX) {
            this._parabola(this._startX, this._startY, this._targetX, this._targetY);
        }
        else if (this._targetX < this._startX) {
            this._parabola(this._targetX, this._targetY, this._startX, this._startY);
        }
        else {
            this._a = 0;
            this._b = 0;
            this._c = 0;
        }
        var distance = Math.sqrt(Math.pow(this._startY - this._targetY, 2) + Math.pow(this._startX - this._targetX, 2));
        this._totalSteps = Math.ceil(distance / this._moveSpeed);
        this._steps = 1;
        return this._totalSteps > 0;
    };
    p._parabola = function (x0, y0, x1, y1) {
        this._a = 0.05 * 50 / Math.abs(x1 - x0);
        this._b = (y1 - y0) / (x1 - x0) - this._a * (x1 + x0);
        this._c = y1 - this._a * x1 * x1 - this._b * x1;
    };
    p._moveOneStep = function () {
        if (this._steps < this._totalSteps) {
            var xy = this._nextStep();
            this.x = xy[0];
            this.y = xy[1];
            this._steps++;
            return false;
        }
        else {
            this.x = this._targetX;
            this.y = this._targetY;
            return true;
        }
    };
    p._nextStep = function () {
        var x = this._startX + (this._targetX - this._startX) * this._steps / this._totalSteps;
        ;
        if (this._a) {
            var y = this._a * x * x + this._b * x + this._c;
        }
        else {
            var y = this._startY + (this._targetY - this._startY) * this._steps / this._totalSteps;
        }
        return [x, y];
    };
    return CastBullet;
}(Bullet));
egret.registerClass(CastBullet,'CastBullet');
//# sourceMappingURL=CastBullet.js.map