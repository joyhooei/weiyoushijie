var Ghost = (function (_super) {
    __extends(Ghost, _super);
    function Ghost() {
        _super.call(this);
        this.addClip("ghost_east_fighting", "east-fighting")
            .addClip("ghost_east_moving", "east-moving")
            .addClip("ghost_building", "east-building")
            .addClip("ghost_guarding", "east-guarding")
            .addClip("ghost_dying", "east-dying");
    }
    var d = __define,c=Ghost,p=c.prototype;
    return Ghost;
}(Soldier));
egret.registerClass(Ghost,'Ghost');
//# sourceMappingURL=Ghost.js.map