var Enemy4 = (function (_super) {
    __extends(Enemy4, _super);
    function Enemy4() {
        _super.call(this);
        this.addClip("enemy4_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy4_south_moving", ["south-moving", 'south-guarding'])
            .addClip("enemy4_north_moving", ["north-moving", 'north-guarding'])
            .addClip("enemy4_dying", "east-dying")
            .addClip("enemy4_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy4,p=c.prototype;
    //30%概率免疫近战伤害
    p.hitBy = function (npc) {
        if (Math.random() < 0.3) {
            this.fight();
            return false;
        }
        else {
            return _super.prototype.hitBy.call(this, npc);
        }
    };
    return Enemy4;
}(Enemy));
egret.registerClass(Enemy4,'Enemy4');
//# sourceMappingURL=Enemy4.js.map