var UpgradeTowerSkillUI = (function (_super) {
    __extends(UpgradeTowerSkillUI, _super);
    function UpgradeTowerSkillUI(base) {
        var _this = this;
        _super.call(this, "upgradeTowerSkillUISkin");
        this._base = base;
        this._tower = base.getTower();
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._base.setTower(null);
            application.hideUI(_this);
        }, this);
        this.imgUpgrade1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeSkill(1);
        }, this);
        this.imgUpgrade2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeSkill(2);
        }, this);
    }
    var d = __define,c=UpgradeTowerSkillUI,p=c.prototype;
    p._upgradeSkill = function (skill) {
        if (skill == 3) {
            if (application.battle.getGolds() >= this._tower.getSkillUpgradePrice(skill)) {
                this._tower.upgradeSkill(skill);
                application.hideUI(this);
            }
            else {
                Toast.launch("需要更多的金币");
            }
        }
        else {
            Toast.launch("已经是最高级了");
        }
    };
    p.onRefresh = function () {
        this.lblUpgradePrice1.text = this._tower.getSkillUpgradePrice(1).toString();
        this.lblUpgradePrice2.text = this._tower.getSkillUpgradePrice(2).toString();
        var claz = this._tower.getClaz();
        switch (claz) {
            case "Magic4Tower":
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
            case "Arrow5Tower":
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
            case "Bomb4Tower":
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
        }
        this.lblSellPrice.text = this._tower.getSellPrice().toString();
    };
    return UpgradeTowerSkillUI;
}(AbstractUI));
egret.registerClass(UpgradeTowerSkillUI,'UpgradeTowerSkillUI');
//# sourceMappingURL=UpgradeTowerSkillUI.js.map