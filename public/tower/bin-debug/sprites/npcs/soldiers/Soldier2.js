var Soldier2 = (function (_super) {
    __extends(Soldier2, _super);
    function Soldier2() {
        _super.call(this);
        this._displays.addClip("soldier2_east_fighting", "east-fighting")
            .addClip("soldier2_east_moving", "east-moving")
            .addClip("soldier2_east_moving", "east-guarding")
            .addClip("soldier2_dying", "dying");
    }
    var d = __define,c=Soldier2,p=c.prototype;
    p.paint = function () {
        this._display(-10, -26, this.width, this.height);
    };
    return Soldier2;
}(Soldier));
egret.registerClass(Soldier2,'Soldier2');
//# sourceMappingURL=Soldier2.js.map