var Sunwukong = (function (_super) {
    __extends(Sunwukong, _super);
    function Sunwukong() {
        _super.call(this);
        this._displays.addClip("sunwukong_east_moving", "east-moving")
            .addClip("sunwukong_east_moving", "guarding")
            .addClip("sunwukong_east_fighting_1", "east-fighting")
            .addClip("sunwukong_east_fighting_2", "east-fighting")
            .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    var d = __define,c=Sunwukong,p=c.prototype;
    p._useSkill = function () {
        var random = Math.round(Math.random() * 10);
        if (random <= 5) {
            this._damage = this._defaultDamage;
            this._skill = 0;
        }
        else if (random <= 8) {
            this._damage = this._defaultDamage << 1;
            this._skill = 1;
        }
        else {
            this._damage = 0;
            this._skill = 2;
            application.battle.addWarriorsByName("Warrior", this);
        }
    };
    p.paint = function () {
        this._display(-10, -26, this.width, this._skill);
    };
    return Sunwukong;
}(Hero));
egret.registerClass(Sunwukong,'Sunwukong');
//# sourceMappingURL=Sunwukong.js.map