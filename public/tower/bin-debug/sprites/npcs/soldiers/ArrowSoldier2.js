var ArrowSoldier2 = (function (_super) {
    __extends(ArrowSoldier2, _super);
    function ArrowSoldier2() {
        _super.call(this);
        this._bulletClaz = "Arrow2";
        this.addClip("arrowsoldier2_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier2_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier2_guarding_png");
    }
    var d = __define,c=ArrowSoldier2,p=c.prototype;
    return ArrowSoldier2;
}(ShootSoldier));
egret.registerClass(ArrowSoldier2,'ArrowSoldier2');
//# sourceMappingURL=ArrowSoldier2.js.map