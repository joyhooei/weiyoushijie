var MagicTower3 = (function (_super) {
    __extends(MagicTower3, _super);
    function MagicTower3() {
        _super.call(this);
        this.addBitmap("magictower3_png");
        this._bulletClaz = "Magic3";
    }
    var d = __define,c=MagicTower3,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 44;
    };
    p.getMuzzleY = function () {
        return this.y + 8;
    };
    return MagicTower3;
}(MagicTower));
egret.registerClass(MagicTower3,'MagicTower3');
//# sourceMappingURL=MagicTower3.js.map