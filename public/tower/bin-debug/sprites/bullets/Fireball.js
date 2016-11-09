var Fireball = (function (_super) {
    __extends(Fireball, _super);
    function Fireball() {
        _super.call(this);
        this.addClip("fireball_moving", "east-moving")
            .addClip("fireball_fighting", "east-fighting");
    }
    var d = __define,c=Fireball,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 50);
        this._skill = Skill.get(application.skills, this.getClaz(), 0);
        if (this._skill) {
            if (this._skill.attrs.level == 1) {
                this._force = Math.round(1.05 * this._force);
            }
            if (this._skill.attrs.level == 2) {
                this._fightingTicks = 5 * application.frameRate;
            }
            if (this._skill.attrs.level == 3) {
                this._force = Math.round(0.7 * this._force);
            }
            if (this._skill.attrs.level == 4) {
                this._force = Math.round(1.05 * this._force);
            }
            if (this._skill.attrs.level == 5) {
                this._force = Math.round(0.5 * this._force);
            }
            if (this._skill.attrs.level == 6) {
                this._force = Math.round(1.2 * this._force);
            }
        }
    };
    p._hitTarget = function () {
        var enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (var i = 0; i < enemies.length; i++) {
            if (this._skill) {
                if (this._skill.attrs.level == 2 && this._skill.attrs.level == 3) {
                    enemies[i].burn(20, 5, false, true);
                }
                else if (this._skill.attrs.level >= 4) {
                    enemies[i].burn(30, 5, false, true);
                }
                else {
                    enemies[i].shootBy(this);
                }
            }
            else {
                enemies[i].shootBy(this);
            }
        }
    };
    return Fireball;
}(Bullet));
egret.registerClass(Fireball,'Fireball');
//# sourceMappingURL=Fireball.js.map