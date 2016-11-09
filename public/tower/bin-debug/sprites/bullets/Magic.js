var Magic = (function (_super) {
    __extends(Magic, _super);
    function Magic() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Magic,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill = Skill.get(application.skills, "MagicTower", 0);
        if (this._skill) {
            if (this._skill.attrs.level == 3) {
                this._force = Math.round(this._force * 1.05);
            }
            if (this._skill.attrs.level == 6) {
                this._force = Math.round(this._force * 1.1);
            }
        }
    };
    p._idle = function () {
        this._ticks++;
        if (this._ticks >= this._idleTicks) {
            this.build();
        }
    };
    p._act = function () {
        if (this._state == EntityState.building) {
            this.move();
            return false;
        }
        else {
            return true;
        }
    };
    p._hitTarget = function () {
        if (this._target.active()) {
            if (this._skill && this._skill.attrs.level == 3 && Math.random() <= 0.1) {
                this._target.damage(this._force);
            }
            else {
                this._target.shootBy(this);
            }
        }
    };
    return Magic;
}(Bullet));
egret.registerClass(Magic,'Magic');
//# sourceMappingURL=Magic.js.map