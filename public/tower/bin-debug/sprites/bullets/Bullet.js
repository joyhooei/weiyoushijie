var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this._target = null;
        this._missing = false;
    }
    var d = __define,c=Bullet,p=c.prototype;
    p.setTarget = function (target) {
        this._target = target;
    };
    p._idle = function () {
        this._do(EntityState.moving);
    };
    p._moving = function () {
        if (this._target.dying() || this._target.dead()) {
            this._missing = true;
            this._do(EntityState.dying);
        }
        else {
            this._turn(this._direction8(this._target.x, this._target.y));
            this._changeSteps(this._target.x, this._target.y);
            this.x += this._steps[0];
            this.y += this._steps[1];
            if (this.collide(this._target)) {
                this._missing = false;
                this._do(EntityState.dying);
                this._target.hitBy(this._damage);
            }
        }
    };
    p._dying = function () {
        if (this._ticks > 3) {
            this._do(EntityState.dead);
        }
    };
    return Bullet;
}(MovableEntity));
egret.registerClass(Bullet,'Bullet');
//# sourceMappingURL=Bullet.js.map