var Enemy18 = (function (_super) {
    __extends(Enemy18, _super);
    function Enemy18() {
        _super.call(this);
        this.addClip("enemy18_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy18_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy18_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy18_dying", "east-dying")
            .addClip("enemy18_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy18,p=c.prototype;
    p._enterGroup = function (enemy) {
        enemy.setArmor(80);
    };
    p._leaveGroup = function (enemy) {
        var character = application.characters[enemy.getClaz()];
        enemy.setArmor(character.arm);
    };
    return Enemy18;
}(GroupEnemy));
egret.registerClass(Enemy18,'Enemy18');
//# sourceMappingURL=Enemy18.js.map