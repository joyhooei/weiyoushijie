var WhiteImpermanence = (function (_super) {
    __extends(WhiteImpermanence, _super);
    function WhiteImpermanence() {
        _super.call(this);
        this.addClip("whiteImpermanence_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
            .addClip("whiteImpermanence_east_moving", ["east-moving", "north-moving", "south-moving"])
            .addAllClips("whiteImpermanence_guarding", "guarding")
            .addAllClips("whiteImpermanence_building", "building")
            .addAllClips("whiteImpermanence_dying", "dying");
    }
    var d = __define,c=WhiteImpermanence,p=c.prototype;
    return WhiteImpermanence;
}(Soldier));
egret.registerClass(WhiteImpermanence,'WhiteImpermanence');
//# sourceMappingURL=WhiteImpermanence.js.map