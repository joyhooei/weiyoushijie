var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.width = this.height = 5;
    }
    var d = __define,c=Bullet,p=c.prototype;
    Bullet.shootAtNPC = function (sourceX, sourceY, target, claz, properties) {
        var bullet = application.pool.get(claz, properties);
        bullet.x = sourceX;
        bullet.y = sourceY;
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        return bullet;
    };
    Bullet.shootByNPC = function (shooter, target, claz, properties) {
        var bullet = application.pool.get(claz, properties);
        bullet.x = shooter.getCenterX();
        bullet.y = shooter.getCenterY();
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        return bullet;
    };
    Bullet.shoot = function (sourceX, sourceY, targetX, targetY, claz, properties) {
        var bullet = application.pool.get(claz, properties);
        bullet.setCenterX(sourceX);
        bullet.setCenterY(sourceY);
        bullet.setTargetPosition(targetX - bullet.width / 2, targetY - bullet.height / 2);
        application.battle.addBullet(bullet);
        return bullet;
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._target = null;
        this._targetX = 0;
        this._targetY = 0;
        this._force = this._get(properties, 'force', 10);
        this._fightTicks = this._get(properties, 'fightTicks', 10);
    };
    p.getForce = function () {
        return this._force;
    };
    p.setTarget = function (target) {
        this._target = target;
        this.setTargetPosition(target.getCenterX(), target.getCenterY());
    };
    p.setTargetPosition = function (targetX, targetY) {
        if (this._targetX != targetX || this._targetY != targetY) {
            this._targetX = targetX;
            this._targetY = targetY;
            this._computeSteps(this.x, this.y, this._targetX, this._targetY);
            this._turn(this._direction4(targetX, targetY));
        }
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            this.fight();
            this._hitTarget();
        }
    };
    p._fighting = function () {
        this._ticks++;
        if (this._ticks >= this._fightTicks) {
            this.erase();
        }
    };
    p._hitTarget = function () {
    };
    return Bullet;
}(MovableEntity));
egret.registerClass(Bullet,'Bullet');
//# sourceMappingURL=Bullet.js.map