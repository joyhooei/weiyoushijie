var Reinforce = (function (_super) {
    __extends(Reinforce, _super);
    function Reinforce() {
        _super.call(this);
        this._displays.addClip("reinforce_east_fighting", "east-fighting")
            .addClip("reinforce_east_moving", "east-moving")
            .addClip("reinforce_east_moving", "guarding")
            .addClip("reinforce_dying", "dying");
    }
    var d = __define,c=Reinforce,p=c.prototype;
    p.paint = function () {
        this._display(-10, -26, this.width, this.height);
    };
    return Reinforce;
}(Soldier));
egret.registerClass(Reinforce,'Reinforce');
//# sourceMappingURL=Reinforce.js.map