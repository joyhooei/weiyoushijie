var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        _super.call(this);
        this.addClip("rhino_east_moving", "east-moving")
            .addClip("rhino_south_moving", "south-moving")
            .addClip("rhino_north_moving", "north-moving")
            .addClip("rhino_dying", "east-dying")
            .addClip("rhino_guarding", "east-guarding")
            .addClip("rhino_east_fighting", "east-fighting");
    }
    var d = __define,c=Rhino,p=c.prototype;
    return Rhino;
}(Enemy));
egret.registerClass(Rhino,'Rhino');
//# sourceMappingURL=Rhino.js.map