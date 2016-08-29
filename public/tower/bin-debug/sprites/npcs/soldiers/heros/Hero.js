var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.createSoldier = function (soldier) {
        var s = soldier.relive(5000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);
        return s;
    };
    return Hero;
}(Soldier));
egret.registerClass(Hero,'Hero',["SoldierCreator"]);
//# sourceMappingURL=Hero.js.map