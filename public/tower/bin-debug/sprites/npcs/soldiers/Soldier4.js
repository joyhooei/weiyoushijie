var Soldier4 = (function (_super) {
    __extends(Soldier4, _super);
    function Soldier4() {
        _super.call(this);
        this.addClip("soldier4_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("soldier4_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("soldier4_dying", "dying");
    }
    var d = __define,c=Soldier4,p=c.prototype;
    return Soldier4;
}(Soldier));
egret.registerClass(Soldier4,'Soldier4');
//# sourceMappingURL=Soldier4.js.map