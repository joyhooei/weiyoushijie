var Soldier5 = (function (_super) {
    __extends(Soldier5, _super);
    function Soldier5() {
        _super.call(this);
        this.addClip("soldier5_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("soldier5_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("soldier5_dying", "dying");
    }
    var d = __define,c=Soldier5,p=c.prototype;
    return Soldier5;
}(Soldier));
egret.registerClass(Soldier5,'Soldier5');
//# sourceMappingURL=Soldier5.js.map