var Sunwukong = (function (_super) {
    __extends(Sunwukong, _super);
    function Sunwukong() {
        _super.call(this);
        this.addClip("sunwukong_east_moving", "east-moving")
            .addClip("sunwukong_east_moving", "guarding")
            .addClip("sunwukong_east_fighting_1", "west-fighting")
            .addClip("sunwukong_east_fighting_2", "east-fighting")
            .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    var d = __define,c=Sunwukong,p=c.prototype;
    p.setLegend = function (legend) {
        var level = legend.attrs.level - 1;
        this._hp.setMaxHp(level * 15 + 30 + this._hp.getMaxHp());
        this._armor += level * 5;
        this._forceHigh += level * 2;
        this._forceLow += level;
        this._force = 0;
        this._skill = 0;
        this._resistance = 10;
        this._skill1 = 2;
        this._skill2 = 1;
        for (var i = 0; i < legend.skills.length; i++) {
            var skill = legend.skills[i];
            if (legend.skills[i].attrs.name == "重击") {
                this._force = 2 * skill.attrs.level;
            }
            else if (legend.skills[i].attrs.name == "荆棘甲") {
                this._resistance = 10 + (skill.attrs.level - 1) * 20;
            }
            else if (legend.skills[i].attrs.name == "金刚不坏") {
                this._hp.setMaxHp((skill.attrs.level - 1) * 30 + this._hp.getMaxHp());
            }
            else if (legend.skills[i].attrs.name == "腾云突击") {
                this._skill1 = 2 * skill.attrs.level;
            }
            else if (legend.skills[i].attrs.name == "猴毛") {
                this._skill2 = skill.attrs.level;
            }
        }
    };
    p._nextSkill = function () {
        var random = Math.round(Math.random() * 10);
        if (random <= 5) {
            this._skill = 0;
        }
        else if (random <= 8) {
            this._skill = 1;
            this._skill1Times = 0;
        }
        else {
            this._skill = 2;
        }
    };
    p._hitOpponents = function () {
        if (this._skill == 0) {
            _super.prototype._hitOpponents.call(this);
            this._nextSkill();
        }
        else if (this._skill == 2) {
            for (var i = 0; i < this._skill2; i++) {
                application.battle.addWarriorsByName("Warrior", this, { maxHp: 60 + (this._skill2 - 1) * 40, guardRadius: this._guardRadius, liveTicks: 8 * application.frameRate });
            }
            this._nextSkill();
        }
        else {
            _super.prototype._hitOpponents.call(this);
            this._skill1Times++;
            if (this._skill1Times < this._skill1 && this._enemy && this._enemy.active()) {
                this._playFightMovieClip();
            }
            else {
                this._nextSkill();
            }
        }
    };
    return Sunwukong;
}(Hero));
egret.registerClass(Sunwukong,'Sunwukong');
//# sourceMappingURL=Sunwukong.js.map