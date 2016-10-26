var Magic = (function (_super) {
    __extends(Magic, _super);
    function Magic() {
        _super.call(this);
    }
    var d = __define,c=Magic,p=c.prototype;
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
            this._target.shootBy(this);
        }
    };
    return Magic;
}(Bullet));
egret.registerClass(Magic,'Magic');
//# sourceMappingURL=Magic.js.map