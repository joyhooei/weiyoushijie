var HitType;
(function (HitType) {
    //物理伤害，可以被护甲armor减少
    HitType[HitType["normal"] = 0] = "normal";
    //魔法伤害，可以被魔抗magicArmor减少
    HitType[HitType["magic"] = 1] = "magic";
    //真实伤害，无视护甲和魔抗
    HitType[HitType["damage"] = 2] = "damage";
})(HitType || (HitType = {}));
;
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.width = this.height = 5;
    }
    var d = __define,c=Bullet,p=c.prototype;
    Bullet.shoot = function (shooter, target, claz, properties) {
        var bullet = application.pool.get(claz, properties);
        bullet.setShooter(shooter);
        bullet.setTarget(target);
        application.battle.addBullet(bullet);
        return bullet;
    };
    Bullet.throw = function (sourceX, sourceY, targetX, targetY, claz, properties) {
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
        this._hitType = this._get(properties, 'hitType', HitType.normal);
        this._fightingTicks = this._get(properties, 'fightingTicks', 10);
        this._shooter = null;
    };
    p.getForce = function () {
        return this._force;
    };
    p.getHitType = function () {
        return this._hitType;
    };
    p.setShooter = function (shooter) {
        this._shooter = shooter;
        this.setCenterX(shooter.getMuzzleX());
        this.setCenterY(shooter.getMuzzleY());
    };
    p.setTarget = function (target) {
        this._target = target;
        this.setTargetPosition(target.getCenterX(), target.getCenterY());
    };
    p.targetKilled = function (target) {
        if (this._shooter) {
            this._shooter.targetKilled(target);
        }
    };
    p.setTargetPosition = function (targetX, targetY) {
        if (this._targetX != targetX || this._targetY != targetY) {
            this._targetX = targetX;
            this._targetY = targetY;
            this._computeSteps(this.x, this.y, this._targetX, this._targetY);
            this._turn(this._directionAt(targetX, targetY));
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
        if (this._ticks >= this._fightingTicks) {
            this.erase();
        }
    };
    p._hitTarget = function () {
    };
    return Bullet;
}(MovableEntity));
egret.registerClass(Bullet,'Bullet');
//# sourceMappingURL=Bullet.js.map