var BombSoldier1 = (function (_super) {
    __extends(BombSoldier1, _super);
    function BombSoldier1() {
        _super.call(this);
        this._bulletClaz = "Bomb1";
        this.addClip("bombsoldier1_east_fighting", ["east-fighting", "south-fighting"])
            .addClip("bombsoldier1_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier1_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
    var d = __define,c=BombSoldier1,p=c.prototype;
    return BombSoldier1;
}(ShootSoldier));
egret.registerClass(BombSoldier1,'BombSoldier1');
//# sourceMappingURL=BombSoldier1.js.map