var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        _super.call(this);
        this.addClip("rhino_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("rhino_dying", "dying")
            .addClip("rhino_east_fighting", ["east-fighting", "south-fighting", "north-fighting", "north-fighting"]);
    }
    var d = __define,c=Rhino,p=c.prototype;
    return Rhino;
}(Enemy));
egret.registerClass(Rhino,'Rhino');
//# sourceMappingURL=Rhino.js.map