var Sunwukong = (function (_super) {
    __extends(Sunwukong, _super);
    function Sunwukong() {
        _super.call(this);
        this.addClip("sunwukong_east_moving", ["east-moving", "south-moving", "north-moving"])
            .addBitmap("sunwukong_guarding_png", ["east-guarding", "west-guarding", "south-guarding", "north-guarding"])
            .addClip("sunwukong_west_fighting_1", ["west-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_east_fighting_2", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_east_fighting_3", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_dying", ["dying"]);
    }
    var d = __define,c=Sunwukong,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill0Ticks = this._hitSpeed;
        this._skill4 = 2;
        this._skill4Times = 0;
        this._skill4Ticks = 8 * application.frameRate;
        this._skill5 = 1;
        this._skill5Ticks = 10 * application.frameRate;
        for (var i = 0; i < application.skills.length; i++) {
            var skill = application.skills[i];
            if (skill.attrs.claz == this.getClaz()) {
                if (skill.attrs.idx == 0) {
                    var level = skill.attrs.level - 1;
                    this._hp.setMaxHp(level * 15 + 30 + this._hp.getMaxHp());
                    this._armor += level * 5;
                    this._forceHigh += level * 2;
                    this._forceLow += level;
                }
                else if (skill.attrs.idx == 1) {
                    //"重击"
                    this._extraForce = 2 * skill.attrs.level;
                }
                else if (skill.attrs.idx == 2) {
                    //"荆棘甲"
                    this._resistance = 10 + (skill.attrs.level - 1) * 20;
                }
                else if (skill.attrs.idx == 3) {
                    //"金刚不坏"
                    this._hp.setMaxHp((skill.attrs.level - 1) * 30 + this._hp.getMaxHp());
                }
                else if (skill.attrs.idx == 4) {
                    //"腾云突击"
                    this._skill4 = 2 * skill.attrs.level;
                    this._skill4Ticks = (9 - skill.attrs.level) * application.frameRate;
                }
                else if (skill.attrs.idx == 5) {
                    //"猴毛"
                    this._skill5 = skill.attrs.level;
                }
            }
        }
    };
    p._readyFight = function () {
        this._skill0Ticks--;
        this._skill4Ticks--;
        this._skill5Ticks--;
        //正在腾云突击中
        if (this._curSkill == 4 && this._skill4Times < this._skill4 && this._enemy && this._enemy.active()) {
            return true;
        }
        if (this._skill5Ticks <= 0) {
            //猴毛冷却:10秒
            this._curSkill = 5;
            this._skill5Ticks = 10 * application.frameRate;
            return true;
        }
        else if (this._skill4Ticks <= 0) {
            //腾云突击冷却:8秒，7秒，6秒
            this._curSkill = 4;
            this._skill4Ticks = (9 - this._skill4 / 2) * application.frameRate;
            this._skill4Times = 0;
            return true;
        }
        else if (this._skill0Ticks <= 0) {
            this._curSkill == 0;
            this._skill0Ticks = this._hitSpeed;
            return true;
        }
        else {
            return false;
        }
    };
    p._hitOpponents = function () {
        if (this._curSkill == 5) {
            for (var i = 0; i < this._skill5; i++) {
                application.battle.addWarriorsByName("Warrior", this, { maxHp: 60 + (this._skill5 - 1) * 40, guardRadius: this._guardRadius, liveTicks: 8 * application.frameRate });
            }
        }
        else {
            if (this._curSkill == 1) {
                this._skill4Times++;
            }
            _super.prototype._hitOpponents.call(this);
        }
    };
    return Sunwukong;
}(Hero));
egret.registerClass(Sunwukong,'Sunwukong');
//# sourceMappingURL=Sunwukong.js.map