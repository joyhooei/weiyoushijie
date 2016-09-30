var BombSoldier3 = (function (_super) {
    __extends(BombSoldier3, _super);
    function BombSoldier3() {
        _super.call(this);
        this._bulletClaz = "Bomb3";
        this.addClip("bombsoldier3_east_fighting", ["east-fighting", "south-fighting"])
            .addBitmap("bombsoldier3_east_guarding_png", ["east-guarding", "south-guarding"])
            .addBitmap("bombsoldier3_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
    var d = __define,c=BombSoldier3,p=c.prototype;
    return BombSoldier3;
}(ShootSoldier));
egret.registerClass(BombSoldier3,'BombSoldier3');
//# sourceMappingURL=BombSoldier3.js.map