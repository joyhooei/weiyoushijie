var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        _super.call(this);
        this._displays.addClip("rhino_east_moving", "east-moving")
            .addClip("rhino_dying", "dying")
            .addClip("rhino_east_moving", "guarding")
            .addClip("rhino_east_fighting", "east-fighting");
    }
    var d = __define,c=Rhino,p=c.prototype;
    return Rhino;
}(Enemy));
egret.registerClass(Rhino,'Rhino');
//# sourceMappingURL=Rhino.js.map