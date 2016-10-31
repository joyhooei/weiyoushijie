var BlackWater = (function (_super) {
    __extends(BlackWater, _super);
    function BlackWater() {
        _super.call(this);
        this.addClip("blackwater_fighting");
    }
    var d = __define,c=BlackWater,p=c.prototype;
    p._hitEnemy = function (enemy, force, ticks) {
        enemy.black(force, ticks);
    };
    return BlackWater;
}(Curse));
egret.registerClass(BlackWater,'BlackWater');
//# sourceMappingURL=BlackWater.js.map