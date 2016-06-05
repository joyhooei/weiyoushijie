var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        this.imgIcon.source = (myProject.sequence + 1).toString() + "_png";
        this.imgTitle.source = "t" + (myProject.sequence + 1).toString() + "_png";
    }
    var d = __define,c=ProjectItem,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.renderProject();
        this.renderAchieves();
        this.lblPrice.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onUpgrade();
        }, this);
        this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onUpgrade();
        }, this);
        this.imgUpgrade10.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._myProject.unlocked == 0) {
                _this.upgrade(10);
            }
        }, this);
        this.imgUpgrade100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._myProject.unlocked == 0) {
                _this.upgrade(100);
            }
        }, this);
        application.dao.addEventListener("Project", function (ev) {
            var myProject = ev.data;
            if (myProject.id == this._myProject.id) {
                this._myProject = myProject;
                this.renderProject();
                this.renderAchieves();
            }
        }, this);
        application.dao.addEventListener("Customer", function (ev) {
            var customer = ev.data;
            this.renderProject();
        }, this);
    };
    p.onUpgrade = function () {
        if (this._myProject.unlocked == 1) {
            this.unlock();
        }
        else {
            this.upgrade(1);
        }
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    };
    p.renderProject = function () {
        if (this._myProject.unlocked == 1) {
            var p = this._project.priceOf(1);
            this.lblLevel.text = "0";
            this.lblOutput.text = "0";
            this.lblPrice.text = application.format(p);
            if (application.usableGold() > p) {
                this.imgUpgrade.source = "updatedp2_png";
            }
            else {
                this.imgUpgrade.source = 'upgradeg_png';
            }
            this.imgUpgrade10.source = "upgrade10g_png";
            this.imgUpgrade100.source = "upgrade100g_png";
        }
        else {
            var p = this._project.priceOf(this._myProject.level);
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = application.format(this.output());
            this.lblPrice.text = application.format(p);
            if (this._myProject.sequence % 2 == 0) {
                if (application.usableGold() > this._project.price(this._myProject.level, 10)) {
                    this.imgUpgrade10.source = "upgrade10_png";
                }
                else {
                    this.imgUpgrade10.source = "upgrade10g_png";
                }
                if (application.usableGold() > this._project.price(this._myProject.level, 100)) {
                    this.imgUpgrade100.source = "upgrade100_png";
                }
                else {
                    this.imgUpgrade100.source = "upgrade100g_png";
                }
                if (application.usableGold() > p) {
                    this.imgUpgrade.source = 'upgrade_png';
                }
                else {
                    this.imgUpgrade.source = 'upgradeg2_png';
                }
            }
            else {
                if (application.usableGold() > this._project.price(this._myProject.level, 10)) {
                    this.imgUpgrade10.source = "upgrade10b_png";
                }
                else {
                    this.imgUpgrade10.source = "upgrade10g_png";
                }
                if (application.usableGold() > this._project.price(this._myProject.level, 100)) {
                    this.imgUpgrade100.source = "upgrade10b_png";
                }
                else {
                    this.imgUpgrade100.source = "upgrade100g_png";
                }
                if (application.usableGold() > p) {
                    this.imgUpgrade.source = 'upgradeb_png';
                }
                else {
                    this.imgUpgrade.source = 'upgradeg2_png';
                }
            }
        }
    };
    p.renderAchieves = function () {
        var self = this;
        self.grpAchieve.removeChildren();
        for (var i = 1; i <= 10; i++) {
            this.grpAchieve.addChild(this.renderAchieve(i));
        }
    };
    p.renderAchieve = function (achieve) {
        var self = this;
        var grp = new eui.Group();
        var img = new eui.Image();
        var icon = "acv" + achieve.toString() + "_png";
        if (achieve <= this._myProject.achieve) {
            //已经购买的成就
            img.source = icon;
            grp.addChild(img);
        }
        else {
            //不允许跨级购买
            if (this._myProject.level >= this._project.achieve(achieve).level && achieve == this._myProject.achieve + 1) {
                //可以购买的成就
                img.source = icon;
                grp.addChild(img);
                img = new eui.Image();
                img.source = "acvnone_png";
                grp.addChild(img);
            }
            else {
                //不可以购买的成就
                img.source = "acvlock_png";
                grp.addChild(img);
            }
        }
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.showUI(new BuyAchieveUI(self._myProject, self._project, achieve));
        }, this);
        return grp;
    };
    p.upgrade = function (step) {
        var self = this;
        var p = this._project.price(this._myProject.level, step);
        if (application.usableGold() < p) {
            Toast.launch("没有足够的金币");
            return;
        }
        var oldOutput = this.output();
        this._myProject.level += step;
        application.dao.save("Project", self._myProject);
        application.buyOutput(p, 0, self.output() - oldOutput);
    };
    p.unlock = function () {
        var self = this;
        var p = this._project.priceOf(1);
        if (application.usableGold() < p) {
            Toast.launch("没有足够的金币");
            return;
        }
        self._myProject.unlocked = 0;
        application.dao.save("Project", self._myProject);
        if (self._myProject.sequence < 19) {
            var project = {};
            project.customer_id = application.customer.id;
            project.sequence = self._myProject.sequence + 1;
            project.unlocked = 1;
            project.achieve = 0;
            project.level = 1;
            application.dao.save("Project", project);
            application.buyOutput(p, 0, self.output());
        }
        else {
            application.buyOutput(p, 0, self.output());
        }
    };
    return ProjectItem;
}(eui.Component));
egret.registerClass(ProjectItem,'ProjectItem');
