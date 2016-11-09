var BattleSystemToolItem = (function (_super) {
    __extends(BattleSystemToolItem, _super);
    function BattleSystemToolItem(tool) {
        _super.call(this, tool);
        this._ticks = 15;
        this._maxTicks = 15;
        var skill = Skill.get(application.skills, "Fireball", 0);
        if (skill) {
            if (skill.attrs.level == 1) {
                this._maxTicks -= 5;
            }
            if (skill.attrs.level == 3) {
                this._maxTicks -= 5;
            }
        }
    }
    var d = __define,c=BattleSystemToolItem,p=c.prototype;
    p.onRefresh = function () {
        if (this._tool.category == "soldier") {
            this.imgTool.source = "soldier_png";
        }
        else {
            this.imgTool.source = "fireball_png";
        }
        this.lblCount.visible = false;
    };
    p.use = function (x, y) {
        if (this._tool.category == "soldier") {
            this._addReinforce(x, y, x - 10, y - 10);
            this._addReinforce(x, y, x + 10, y + 10);
        }
        else {
            var bulletClaz = "Fireball";
            var skill = Skill.get(application.skills, "Fireball", 0);
            if (skill) {
                if (skill.attrs.level >= 5) {
                    var entrances = application.battle.getEntrances();
                    for (var i = 0; i < entrances.length; i++) {
                        Bullet.throw(entrances[i][0], entrances[i][1] - 200, entrances[i][0], entrances[i][1], bulletClaz);
                    }
                }
                else if (skill.attrs.level >= 3) {
                    Bullet.throw(x + 10, y - 200, x + 10, y, bulletClaz);
                    Bullet.throw(x, y - 200, x, y, bulletClaz);
                }
                else {
                    Bullet.throw(x, y - 200, x, y, bulletClaz);
                }
            }
            else {
                Bullet.throw(x, y - 200, x, y, bulletClaz);
            }
        }
        this._ticks = 0;
    };
    p._addReinforce = function (x, y, guradX, guardY) {
        var soldier = application.pool.get("Reinforce", { guardX: guradX, guardY: guardY });
        soldier.stand(x, y);
        application.battle.addSoldier(soldier);
    };
    return BattleSystemToolItem;
}(BattleToolItem));
egret.registerClass(BattleSystemToolItem,'BattleSystemToolItem');
//# sourceMappingURL=BattleSystemToolItem.js.map