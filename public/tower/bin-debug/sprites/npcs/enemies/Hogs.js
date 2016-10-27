var Hogs = (function (_super) {
    __extends(Hogs, _super);
    function Hogs() {
        _super.call(this);
        this.addClip("hogs_east_moving", ["east-moving", "east-guarding"])
            .addClip("hogs_north_moving", ["north-moving", "north-guarding"])
            .addClip("hogs_dying", "dying")
            .addClip("hogs_east_fighting", ["east-fighting", "south-fighting", "north-fighting"]);
    }
    var d = __define,c=Hogs,p=c.prototype;
    return Hogs;
}(Enemy));
egret.registerClass(Hogs,'Hogs');
//# sourceMappingURL=Hogs.js.map