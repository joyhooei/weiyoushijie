var ArrowSoldier4 = (function (_super) {
    __extends(ArrowSoldier4, _super);
    function ArrowSoldier4() {
        _super.call(this);
        this._bulletClaz = "Arrow4";
        this.addClip("arrowsoldier4_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier4_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier4_guarding_png");
    }
    var d = __define,c=ArrowSoldier4,p=c.prototype;
    return ArrowSoldier4;
}(ShootSoldier));
egret.registerClass(ArrowSoldier4,'ArrowSoldier4');
//# sourceMappingURL=ArrowSoldier4.js.map