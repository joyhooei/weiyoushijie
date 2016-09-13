var Hogs = (function (_super) {
    __extends(Hogs, _super);
    function Hogs() {
        _super.call(this);
        this._displays.addClip("hogs_east_moving", "east-moving")
            .addClip("hogs_dying", "dying")
            .addClip("hogs_east_moving", "guarding")
            .addClip("hogs_east_fighting", "east-fighting");
    }
    var d = __define,c=Hogs,p=c.prototype;
    return Hogs;
}(Enemy));
egret.registerClass(Hogs,'Hogs');
//# sourceMappingURL=Hogs.js.map