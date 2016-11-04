var Enemy5 = (function (_super) {
    __extends(Enemy5, _super);
    function Enemy5() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy5,p=c.prototype;
    //80%概率免疫近战伤害
    p.hitBy = function (npc) {
        if (Math.random() < 0.8) {
            this.fight();
            return false;
        }
        else {
            return _super.prototype.hitBy.call(this, npc);
        }
    };
    return Enemy5;
}(Enemy));
egret.registerClass(Enemy5,'Enemy5');
//# sourceMappingURL=Enemy5.js.map