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
        this._angle = 0;
        this._flyTicks = 0;
    };
    p._idle = function () {
        this._initX = this.x;
        this._initY = this.y;
        _super.prototype._idle.call(this);
    };
    p._computeSteps = function (x, y) {
        var stepX = (x - this._initX) / this._flyHeight;
        var stepY = ((y - this._initY) - (this._gravity * this._flyHeight * this._flyHeight / 2)) / this._flyHeight;
        this._delta = [stepX, stepY];
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            this._do(EntityState.dying);
        }
        else {
            //如果目标移动，重新调整方向和路径
            if (this._targetX != this._target.x || this._targetY != this._target.y) {
                this.setTarget(this._target);
            }
        }
    };
    p._moveOneStep = function () {
        this._flyTicks += 0.5;
        this.x = this._initX + this._flyTicks * this._delta[0];
        this.y = this._initY + this._flyTicks * this._delta[1] + this._gravity * this._flyTicks * this._flyTicks / 2;
        this._flyTicks += 0.5;
        var sx = this._initX + this._flyTicks * this._delta[0];
        var sy = this._initY + this._flyTicks * this._delta[1] + this._gravity * this._flyTicks * this._flyTicks / 2;
        var dx = sx - this.x;
        var dy = sy - this.y;
        this._angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        this._flyTicks -= 0.5;
        return this._hitTest();
    };
    p._hitTest = function () {
        if (this._angle > 180 && this._angle < 360) {
            var disx = this.x - this._target.x < 0 ? this._target.x - this.x : this.x - this._target.x;
            var disy = this.y - this._target.y < 0 ? this._target.y - this.y : this.y - this._target.y;
            if (disx <= this._delta[0] && disy < this._delta[1]) {
                this._hitTarget();
                return true;
            }
        }
        return false;
    };
    p._hitTarget = function () {
    };
    return CastBullet;
}(Bullet));
egret.registerClass(CastBullet,'CastBullet');
//# sourceMappingURL=CastBullet.js.map