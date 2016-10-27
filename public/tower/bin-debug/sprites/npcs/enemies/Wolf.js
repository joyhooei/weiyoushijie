var Wolf = (function (_super) {
    __extends(Wolf, _super);
    function Wolf() {
        _super.call(this);
        this.addAllClips("wolf_dying", "dying")
            .addClip("wolf_east_moving", ["east-moving", "east-guarding"])
            .addClip("wolf_north_moving", ["north-moving", "north-guarding"])
            .addClip("wolf_south_moving", ["south-moving", "south-guarding"])
            .addClip("wolf_east_fighting", ["east-fighting", "south-fighting", "north-fighting"]);
    }
    var d = __define,c=Wolf,p=c.prototype;
    return Wolf;
}(Enemy));
egret.registerClass(Wolf,'Wolf');
//# sourceMappingURL=Wolf.js.map