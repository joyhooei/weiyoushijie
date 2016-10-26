var Ghost = (function (_super) {
    __extends(Ghost, _super);
    function Ghost() {
        _super.call(this);
        this.addClip("ghost_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("ghost_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("ghost_building", "building")
            .addAllClips("ghost_guarding", "guarding")
            .addAllClips("ghost_dying", "dying");
    }
    var d = __define,c=Ghost,p=c.prototype;
    return Ghost;
}(Soldier));
egret.registerClass(Ghost,'Ghost');
//# sourceMappingURL=Ghost.js.map