var WeakCurse = (function (_super) {
    __extends(WeakCurse, _super);
    function WeakCurse() {
        _super.call(this);
        this.addClip("weakcurse_dying", "east-fighting");
    }
    var d = __define,c=WeakCurse,p=c.prototype;
    p._hitEnemy = function (enemy, force, ticks) {
        enemy.weak(force, ticks);
    };
    return WeakCurse;
}(Curse));
egret.registerClass(WeakCurse,'WeakCurse');
//# sourceMappingURL=WeakCurse.js.map