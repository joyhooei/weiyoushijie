var Soldier3 = (function (_super) {
    __extends(Soldier3, _super);
    function Soldier3() {
        _super.call(this);
        this.addClip("soldier3_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("soldier3_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("soldier3_guarding", "guarding")
            .addAllClips("soldier3_dying", "dying");
    }
    var d = __define,c=Soldier3,p=c.prototype;
    return Soldier3;
}(Soldier));
egret.registerClass(Soldier3,'Soldier3');
//# sourceMappingURL=Soldier3.js.map