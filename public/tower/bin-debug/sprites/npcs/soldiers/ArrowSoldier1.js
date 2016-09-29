var ArrowSoldier1 = (function (_super) {
    __extends(ArrowSoldier1, _super);
    function ArrowSoldier1() {
        _super.call(this);
        this._bulletClaz = "Arrow1";
        this.addClip("arrowsoldier1_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier1_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier1_guarding_png");
    }
    var d = __define,c=ArrowSoldier1,p=c.prototype;
    return ArrowSoldier1;
}(ShootSoldier));
egret.registerClass(ArrowSoldier1,'ArrowSoldier1');
//# sourceMappingURL=ArrowSoldier1.js.map