var Freeze = (function (_super) {
    __extends(Freeze, _super);
    function Freeze() {
        _super.call(this);
        this.addClip("freeze_dying");
    }
    var d = __define,c=Freeze,p=c.prototype;
    p._hitEnemy = function (enemy, force, ticks) {
        enemy.frozen(force, ticks);
    };
    return Freeze;
}(Curse));
egret.registerClass(Freeze,'Freeze');
//# sourceMappingURL=Freeze.js.map