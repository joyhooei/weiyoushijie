var BombTower2 = (function (_super) {
    __extends(BombTower2, _super);
    function BombTower2() {
        _super.call(this);
        this._bulletClaz = "Bomb2";
        this.addBitmap("bombtower2_png");
    }
    var d = __define,c=BombTower2,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 32;
    };
    p.getMuzzleY = function () {
        return this.y + 9;
    };
    return BombTower2;
}(BombTower));
egret.registerClass(BombTower2,'BombTower2');
//# sourceMappingURL=BombTower2.js.map