var SoldierTower4 = (function (_super) {
    __extends(SoldierTower4, _super);
    function SoldierTower4() {
        _super.call(this);
        this.addBitmap("soldiertower4_png");
        this._soldierClaz = "Soldier4";
    }
    var d = __define,c=SoldierTower4,p=c.prototype;
    p.skillUpgradable = function (skill) {
        return false;
    };
    p.upgradable = function () {
        return false;
    };
    return SoldierTower4;
}(SoldierTower));
egret.registerClass(SoldierTower4,'SoldierTower4');
//# sourceMappingURL=SoldierTower4.js.map