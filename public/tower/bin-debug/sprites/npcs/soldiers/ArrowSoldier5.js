var ArrowSoldier5 = (function (_super) {
    __extends(ArrowSoldier5, _super);
    function ArrowSoldier5() {
        _super.call(this);
        this._bulletClaz = "Arrow5";
        this.addClip("arrowsoldier5_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier5_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier5_guarding_png");
    }
    var d = __define,c=ArrowSoldier5,p=c.prototype;
    return ArrowSoldier5;
}(ShootSoldier));
egret.registerClass(ArrowSoldier5,'ArrowSoldier5');
//# sourceMappingURL=ArrowSoldier5.js.map