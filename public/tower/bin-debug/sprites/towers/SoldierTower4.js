var SoldierTower4 = (function (_super) {
    __extends(SoldierTower4, _super);
    function SoldierTower4() {
        _super.call(this);
        this.addBitmap("soldiertower4_png");
        this._soldierClaz = "Soldier4";
    }
    var d = __define,c=SoldierTower4,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill1Level = 0;
        this._skill2Level = 0;
        this._skill3Level = 0;
    };
    p.totalSkills = function () {
        return 3;
    };
    p.upgradeSkill = function (skill) {
        if (skill == 1) {
            this._skill1Level++;
            for (var i = 0; i < this._soldiers.length; i++) {
                this._soldiers[i].addMaxHp(50 * this._skill1Level);
            }
        }
        else if (skill == 2) {
            this._skill2Level++;
        }
        else {
            this._skill3Level++;
        }
    };
    p.skillUpgradable = function (skill) {
        if (skill == 1) {
            return this._skill1Level < 3;
        }
        else if (skill == 2) {
            return this._skill2Level < 3;
        }
        else {
            return this._skill3Level < 3;
        }
    };
    p.upgradable = function () {
        return false;
    };
    p.getSkillUpgradePrice = function (skill) {
        if (skill == 1) {
            var price = 200;
        }
        else if (skill == 2) {
            if (this._skill2Level == 0) {
                var price = 250;
            }
            else {
                var price = 150;
            }
        }
        else {
            if (this._skill3Level == 0) {
                var price = 250;
            }
            else {
                var price = 150;
            }
        }
        return price;
    };
    p.getSkillLevel = function (skill) {
        if (skill == 1) {
            return this._skill1Level;
        }
        else if (skill == 2) {
            return this._skill2Level;
        }
        else {
            return this._skill3Level;
        }
    };
    return SoldierTower4;
}(SoldierTower));
egret.registerClass(SoldierTower4,'SoldierTower4');
//# sourceMappingURL=SoldierTower4.js.map