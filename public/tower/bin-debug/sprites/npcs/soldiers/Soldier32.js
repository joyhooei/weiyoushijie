var Soldier32 = (function (_super) {
    __extends(Soldier32, _super);
    function Soldier32() {
        _super.call(this);
        this._displays.addClip("soldier32_east_fighting", "east-fighting")
            .addClip("soldier32_east_moving", "east-moving")
            .addClip("soldier32_east_moving", "east-guarding")
            .addClip("soldier32_dying", "dying");
    }
    var d = __define,c=Soldier32,p=c.prototype;
    p.paint = function () {
        this._display(-10, -26, this.width, this.height);
    };
    return Soldier32;
}(Soldier));
egret.registerClass(Soldier32,'Soldier32');
//# sourceMappingURL=Soldier32.js.map