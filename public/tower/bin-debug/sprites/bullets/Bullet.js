var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.width = this.height = 5;
    }
    var d = __define,c=Bullet,p=c.prototype;
    Bullet.shootAtNPC = function (sourceX, sourceY, target, claz) {
        var bullet = application.pool.get(claz);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        return bullet;
    };
    Bullet.shootByNPC = function (shooter, target, claz) {
        var bullet = application.pool.get(claz);
        bullet.x = shooter.getCenterX();
        bullet.y = shooter.getCenterY();
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        return bullet;
    };
    Bullet.shoot = function (sourceX, sourceY, targetX, targetY, claz) {
        var bullet = application.pool.get(claz);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTargetPosition(targetX, targetY);
        application.battle.addBullet(bullet);
        return bullet;
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._target = null;
        this._targetX = 0;
        this._targetY = 0;
        this._force = this._get(properties, 'force', 10);
    };
    p.getForce = function () {
        return this._force;
    };
    p.setTarget = function (target) {
        this._target = target;
        this.setTargetPosition(target.getCenterX(), target.getCenterY());
    };
    p.setTargetPosition = function (targetX, targetY) {
        this._targetX = targetX;
        this._targetY = targetY;
        this._computeSteps(this.x, this.y, this._targetX, this._targetY);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            this._hitTarget();
            this.kill();
        }
        else {
            //如果目标移动，重新调整方向和路径
            if (this._target && (this._targetX != this._target.x || this._targetY != this._target.y)) {
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