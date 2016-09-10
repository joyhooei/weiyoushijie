var Soldier1 = (function (_super) {
    __extends(Soldier1, _super);
    function Soldier1() {
        _super.call(this);
        this._displays.addClip("soldier1_east_fighting", "east-fighting")
            .addClip("soldier1_east_moving", "east-moving")
            .addClip("soldier1_east_moving", "east-guarding")
            .addClip("soldier1_dying", "dying");
    }
    var d = __define,c=Soldier1,p=c.prototype;
    p.paint = function () {
        this._display(-10, -26, this.width, this.height);
    };
    return Soldier1;
}(Soldier));
egret.registerClass(Soldier1,'Soldier1');
//# sourceMappingURL=Soldier1.js.map