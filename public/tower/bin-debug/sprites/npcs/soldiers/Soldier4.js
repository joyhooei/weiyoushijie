var Soldier4 = (function (_super) {
    __extends(Soldier4, _super);
    function Soldier4() {
        _super.call(this);
        this.addClip("soldier4_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("soldier4_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("soldier4_guarding", "guarding")
            .addAllClips("soldier4_dying", "dying");
    }
    var d = __define,c=Soldier4,p=c.prototype;
    return Soldier4;
}(Soldier));
egret.registerClass(Soldier4,'Soldier4');
//# sourceMappingURL=Soldier4.js.map