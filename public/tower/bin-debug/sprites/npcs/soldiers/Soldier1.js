var Soldier1 = (function (_super) {
    __extends(Soldier1, _super);
    function Soldier1() {
        _super.call(this);
        this.addClip("soldier1_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("soldier1_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("soldier1_guarding", "guarding")
            .addAllClips("soldier1_dying", "dying");
    }
    var d = __define,c=Soldier1,p=c.prototype;
    return Soldier1;
}(Soldier));
egret.registerClass(Soldier1,'Soldier1');
//# sourceMappingURL=Soldier1.js.map