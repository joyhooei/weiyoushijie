var Soldier2 = (function (_super) {
    __extends(Soldier2, _super);
    function Soldier2() {
        _super.call(this);
        this.addClip("soldier2_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("soldier2_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("soldier2_guarding", "guarding")
            .addAllClips("soldier2_dying", "dying");
    }
    var d = __define,c=Soldier2,p=c.prototype;
    return Soldier2;
}(Soldier));
egret.registerClass(Soldier2,'Soldier2');
//# sourceMappingURL=Soldier2.js.map