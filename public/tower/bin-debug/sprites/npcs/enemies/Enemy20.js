var Enemy20 = (function (_super) {
    __extends(Enemy20, _super);
    function Enemy20() {
        _super.call(this);
        this.addClip("enemy20_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy20_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy20_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy20_dying", "east-dying")
            .addClip("enemy20_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy20,p=c.prototype;
    p._enterGroup = function (enemy) {
        enemy.setMagicArmor(80);
    };
    p._leaveGroup = function (enemy) {
        var character = application.characters[enemy.getClaz()];
        enemy.setMagicArmor(character.magicArm);
    };
    return Enemy20;
}(GroupEnemy));
egret.registerClass(Enemy20,'Enemy20');
//# sourceMappingURL=Enemy20.js.map