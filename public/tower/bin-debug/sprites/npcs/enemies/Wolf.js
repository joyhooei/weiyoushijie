var Wolf = (function (_super) {
    __extends(Wolf, _super);
    function Wolf() {
        _super.call(this);
        this._displays.addClip("wolf_east_moving", "east-moving").addClip("wolf_dying", "dying").addClip("wolf_east_fighting", "east-fighting");
    }
    var d = __define,c=Wolf,p=c.prototype;
    p.paint = function () {
        this._display(20, 20, this.width, this.height);
    };
    return Wolf;
}(Enemy));
egret.registerClass(Wolf,'Wolf');
//# sourceMappingURL=Wolf.js.map