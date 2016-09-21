var Soldier1 = (function (_super) {
    __extends(Soldier1, _super);
    function Soldier1() {
        _super.call(this);
        this.addClip("soldier1_west_fighting", "west-fighting")
            .addClip("soldier1_west_moving", "west-moving")
            .addClip("soldier1_west_moving", "west-guarding")
            .addClip("soldier1_dying", "dying");
    }
    var d = __define,c=Soldier1,p=c.prototype;
    return Soldier1;
}(Soldier));
egret.registerClass(Soldier1,'Soldier1');
//# sourceMappingURL=Soldier1.js.map