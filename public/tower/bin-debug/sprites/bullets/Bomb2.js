var Bomb2 = (function (_super) {
    __extends(Bomb2, _super);
    function Bomb2() {
        _super.call(this);
        this.addBitmap("bomb2_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_fighting", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"]);
    }
    var d = __define,c=Bomb2,p=c.prototype;
    return Bomb2;
}(Bomb));
egret.registerClass(Bomb2,'Bomb2');
//# sourceMappingURL=Bomb2.js.map