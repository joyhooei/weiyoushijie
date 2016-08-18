var Magic = (function (_super) {
    __extends(Magic, _super);
    function Magic() {
        _super.call(this);
    }
    var d = __define,c=Magic,p=c.prototype;
    p._hitTarget = function () {
        if (this._target.active()) {
            this._target.hitBy(this._damage);
        }
    };
    return Magic;
}(Bullet));
egret.registerClass(Magic,'Magic');
//# sourceMappingURL=Magic.js.map