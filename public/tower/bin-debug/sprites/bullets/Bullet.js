var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
    }
    var d = __define,c=Bullet,p=c.prototype;
    Bullet.shoot = function (x, y, target, claz) {
        var bullet = application.pool.get(claz);
        bullet.x = x;
        bullet.y = y;
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._target = null;
        this._targetX = 0;
        this._targetY = 0;
        this._damage = this._get(properties, 'damage', 10);
    };
    p.setTarget = function (target) {
        this._target = target;
        this._targetX = target.getCenterX();
        this._targetY = target.getCenterY();
        this._computeSteps(this._targetX, this._targetY);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            this._hitTarget();
            this.kill();
        }
        else {
            //如果目标移动，重新调整方向和路径
            if (this._targetX != this._target.x || this._targetY != this._target.y) {
                this.setTarget(this._target);
            }
        }
    };
    p._hitTarget = function () {
    };
    return Bullet;
}(MovableEntity));
egret.registerClass(Bullet,'Bullet');
//# sourceMappingURL=Bullet.js.map