var MagicTower5 = (function (_super) {
    __extends(MagicTower5, _super);
    function MagicTower5() {
        _super.call(this);
        this.addBitmap("magictower5_png");
        this._bulletClaz = "Magic5";
    }
    var d = __define,c=MagicTower5,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 44;
    };
    p.getMuzzleY = function () {
        return this.y + 23;
    };
    return MagicTower5;
}(MagicTower));
egret.registerClass(MagicTower5,'MagicTower5');
//# sourceMappingURL=MagicTower5.js.map