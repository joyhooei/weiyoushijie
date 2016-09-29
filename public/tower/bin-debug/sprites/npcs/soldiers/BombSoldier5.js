var BombSoldier5 = (function (_super) {
    __extends(BombSoldier5, _super);
    function BombSoldier5() {
        _super.call(this);
        this._bulletClaz = "Bomb5";
        this.addClip("bombsoldier5_west_fighting", ["west-fighting", "south-fighting"])
            .addClip("bombsoldier5_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier5_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
    var d = __define,c=BombSoldier5,p=c.prototype;
    return BombSoldier5;
}(ShootSoldier));
egret.registerClass(BombSoldier5,'BombSoldier5');
//# sourceMappingURL=BombSoldier5.js.map