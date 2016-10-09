var Bomb1 = (function (_super) {
    __extends(Bomb1, _super);
    function Bomb1() {
        _super.call(this);
        this.addBitmap("bomb1_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_fighting", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"]);
    }
    var d = __define,c=Bomb1,p=c.prototype;
    return Bomb1;
}(Bomb));
egret.registerClass(Bomb1,'Bomb1');
//# sourceMappingURL=Bomb1.js.map