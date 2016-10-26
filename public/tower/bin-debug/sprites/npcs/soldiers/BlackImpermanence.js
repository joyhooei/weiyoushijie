var BlackImpermanence = (function (_super) {
    __extends(BlackImpermanence, _super);
    function BlackImpermanence() {
        _super.call(this);
        this.addClip("blackImpermanence_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("blackImpermanence_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("blackImpermanence_guarding", "guarding")
            .addAllClips("blackImpermanence_building", "building")
            .addAllClips("blackImpermanence_dying", "dying");
    }
    var d = __define,c=BlackImpermanence,p=c.prototype;
    return BlackImpermanence;
}(Soldier));
egret.registerClass(BlackImpermanence,'BlackImpermanence');
//# sourceMappingURL=BlackImpermanence.js.map