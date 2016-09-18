var Warrior = (function (_super) {
    __extends(Warrior, _super);
    function Warrior() {
        _super.call(this);
        this.addClip("warrior_east_fighting", "east-fighting").addClip("warrior_east_fighting", "moving").addClip("warrior_east_fighting", "guarding")
            .addClip("warrior_dying", "dying");
    }
    var d = __define,c=Warrior,p=c.prototype;
    return Warrior;
}(Soldier));
egret.registerClass(Warrior,'Warrior');
//# sourceMappingURL=Warrior.js.map