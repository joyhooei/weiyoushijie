var BombSoldier4 = (function (_super) {
    __extends(BombSoldier4, _super);
    function BombSoldier4() {
        _super.call(this);
        this._bulletClaz = "Bomb4";
        this.addClip("bombsoldier4_west_fighting", ["west-fighting", "south-fighting"])
            .addClip("bombsoldier4_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier4_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
    var d = __define,c=BombSoldier4,p=c.prototype;
    return BombSoldier4;
}(ShootSoldier));
egret.registerClass(BombSoldier4,'BombSoldier4');
//# sourceMappingURL=BombSoldier4.js.map