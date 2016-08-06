var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        application.battle.enableSelect(this);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.select = function (again) {
    };
    p.deselect = function () {
    };
    p._idle = function () {
        this._do(EntityState.guarding);
    };
    return Hero;
}(Soldier));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map