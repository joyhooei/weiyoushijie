var BombTower5 = (function (_super) {
    __extends(BombTower5, _super);
    function BombTower5() {
        _super.call(this);
        this._bulletClaz = "Bomb1";
        this.addBitmap("bombtower5_png");
    }
    var d = __define,c=BombTower5,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 30;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return BombTower5;
}(BombTower));
egret.registerClass(BombTower5,'BombTower5');
//# sourceMappingURL=BombTower5.js.map