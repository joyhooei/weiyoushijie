var Guard = (function (_super) {
    __extends(Guard, _super);
    function Guard() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Guard,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        var skill = Skill.get(application.skills, "Guard", 0);
        if (skill) {
            if (skill.attrs.level == 1) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow = Math.round(1.05 * this._forceLow);
                this._hp.setMaxHp(Math.round(1.05 * this._hp.getMaxHp()));
            }
            if (skill.attrs.level == 1) {
                this._armor = Math.round(1.1 * this._armor);
                this._hp.setMaxHp(Math.round(1.05 * this._hp.getMaxHp()));
            }
            if (skill.attrs.level == 3) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow = Math.round(1.05 * this._forceLow);
                this._hp.setMaxHp(Math.round(1.05 * this._hp.getMaxHp()));
            }
            if (skill.attrs.level == 4) {
                this._forceHigh = Math.round(1.1 * this._forceHigh);
                this._forceLow = Math.round(1.1 * this._forceLow);
                this._hp.setMaxHp(Math.round(1.05 * this._hp.getMaxHp()));
            }
            if (skill.attrs.level == 6) {
                this._forceHigh = Math.round(1.2 * this._forceHigh);
                this._forceLow = Math.round(1.2 * this._forceLow);
            }
        }
    };
    //强壮
    p.setCreator = function (creator) {
        if (creator) {
            var tower = creator;
            this.addMaxHp(50 * tower.getSkillLevel(1));
        }
        _super.prototype.setCreator.call(this, creator);
    };
    //复活后拥有30%的血量
    p.damage = function (d) {
        if (this.active()) {
            if (this._hp.damage(d)) {
                var tower = this._creator;
                if (tower.getSkillLevel(3) > 0) {
                    if (Math.random() <= 0.1 + 0.1 * tower.getSkillLevel(3)) {
                        this._hp.setHp(Math.round(this._hp.getMaxHp() * 0.3));
                        return false;
                    }
                }
                this.kill();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    //有15%的几率使敌人流血3秒，可以叠加
    p._hitOpponents = function () {
        _super.prototype._hitOpponents.call(this);
        if (this._enemy && this._enemy.active()) {
            var tower = this._creator;
            if (tower.getSkillLevel(2) > 0) {
                if (Math.random() <= 0.15) {
                    this._enemy.attack(tower.getSkillLevel(2) * 15 + 10, 3 * application.frameRate, true);
                }
            }
        }
    };
    return Guard;
}(Soldier));
egret.registerClass(Guard,'Guard');
//# sourceMappingURL=Guard.js.map