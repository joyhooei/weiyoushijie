var BombTower3 = (function (_super) {
    __extends(BombTower3, _super);
    function BombTower3() {
        _super.call(this);
        this._bulletClaz = "Bomb3";
        this.addBitmap("bombtower3_png");
    }
    var d = __define,c=BombTower3,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 33;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return BombTower3;
}(BombTower));
egret.registerClass(BombTower3,'BombTower3');
//# sourceMappingURL=BombTower3.js.map