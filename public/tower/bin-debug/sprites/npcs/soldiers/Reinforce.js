var Reinforce = (function (_super) {
    __extends(Reinforce, _super);
    function Reinforce() {
        _super.call(this);
        this.addClip("reinforce_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("reinforce_east_moving", ["east-moving", "south-moving", "north-moving", "east-guarding", "south-guarding", "north-guarding"])
            .addClip("reinforce_dying", "dying");
    }
    var d = __define,c=Reinforce,p=c.prototype;
    return Reinforce;
}(Soldier));
egret.registerClass(Reinforce,'Reinforce');
//# sourceMappingURL=Reinforce.js.map