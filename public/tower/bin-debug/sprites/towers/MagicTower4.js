var MagicTower4 = (function (_super) {
    __extends(MagicTower4, _super);
    function MagicTower4() {
        _super.call(this);
        this.addBitmap("magictower4_png");
        this._bulletClaz = "Magic4";
    }
    var d = __define,c=MagicTower4,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 40;
    };
    p.getMuzzleY = function () {
        return this.y + 15;
    };
    return MagicTower4;
}(MagicTower));
egret.registerClass(MagicTower4,'MagicTower4');
//# sourceMappingURL=MagicTower4.js.map