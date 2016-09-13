var Soldier31 = (function (_super) {
    __extends(Soldier31, _super);
    function Soldier31() {
        _super.call(this);
        this._displays.addClip("soldier31_east_fighting", "east-fighting")
            .addClip("soldier31_east_moving", "east-moving")
            .addClip("soldier31_east_moving", "east-guarding")
            .addClip("soldier31_dying", "dying");
    }
    var d = __define,c=Soldier31,p=c.prototype;
    p.paint = function () {
        this._display(-10, -26, this.width, this.height);
    };
    return Soldier31;
}(Soldier));
egret.registerClass(Soldier31,'Soldier31');
//# sourceMappingURL=Soldier31.js.map