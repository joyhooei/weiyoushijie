var MiscastCurse = (function (_super) {
    __extends(MiscastCurse, _super);
    function MiscastCurse() {
        _super.call(this);
        this.addClip("miscastcurse_dying", "east-fighting");
    }
    var d = __define,c=MiscastCurse,p=c.prototype;
    p._hitEnemy = function (enemy, force, ticks) {
        enemy.miscast(force, ticks);
    };
    return MiscastCurse;
}(Curse));
egret.registerClass(MiscastCurse,'MiscastCurse');
//# sourceMappingURL=MiscastCurse.js.map