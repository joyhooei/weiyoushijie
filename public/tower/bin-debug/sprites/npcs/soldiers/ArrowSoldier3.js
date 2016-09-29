var ArrowSoldier3 = (function (_super) {
    __extends(ArrowSoldier3, _super);
    function ArrowSoldier3() {
        _super.call(this);
        this._bulletClaz = "Arrow3";
        this.addClip("arrowsoldier3_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier3_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier3_guarding_png");
    }
    var d = __define,c=ArrowSoldier3,p=c.prototype;
    return ArrowSoldier3;
}(ShootSoldier));
egret.registerClass(ArrowSoldier3,'ArrowSoldier3');
//# sourceMappingURL=ArrowSoldier3.js.map