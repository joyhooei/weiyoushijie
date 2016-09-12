var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill = 0;
        this._defaultDamage = this._damage;
    };
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