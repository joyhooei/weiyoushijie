var BombSoldier2 = (function (_super) {
    __extends(BombSoldier2, _super);
    function BombSoldier2() {
        _super.call(this);
        this._bulletClaz = "Bomb2";
        this.addClip("bombsoldier2_east_fighting", ["east-fighting", "south-fighting"])
            .addBitmap("bombsoldier2_east_guarding_png", ["east-guarding", "south-guarding"])
            .addBitmap("bombsoldier2_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
    var d = __define,c=BombSoldier2,p=c.prototype;
    return BombSoldier2;
}(ShootSoldier));
egret.registerClass(BombSoldier2,'BombSoldier2');
//# sourceMappingURL=BombSoldier2.js.map