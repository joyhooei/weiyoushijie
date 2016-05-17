var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project, iconName, titleName) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.firstRefresh, this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
    }
    var d = __define,c=ProjectItem,p=c.prototype;
    p.refresh = function (myProject) {
        this._myProject = myProject;
        if (this._myProject.unlocked == 1) {
            this.renderLocked();
        }
        else {
            this.renderUnlocked();
        }
    };
    p.firstRefresh = function () {
        var _this = this;
        this.refresh(this._myProject);
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
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    };
    p.renderAchieves = function () {
        var self = this;
        self.grpAchieve.removeChildren();
        for (var i = 1; i <= 10; i++) {
            var grp = new eui.Group();
            var img = new eui.Image();
            if (i <= this._myProject.achieve) {
                //已经购买的成就
                img.source = "acv" + i.toString() + "_png";
                grp.addChild(img);
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //show help
                }, this);
            }
            else {
                if (this._myProject.level > this._project.levelOfAchieve(i - 1)) {
                    //可以购买的成就
                    img.source = "acv" + i.toString() + "_png";
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
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    var ui = new BuyAchieveUI(self._myProject, self._project);
                    ui.horizontalCenter = 0;
                    ui.verticalCenter = 0;
                    application.main.homeUI.addChild(ui);
                }, this);
            }
            this.grpAchieve.addChild(grp);
        }
    };
    p.renderLocked = function () {
        this.lblLevel.text = "0";
        this.lblOutput.text = "0";
        this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
        this.imgUpgrade10.source = "upgrade10g_png";
        this.imgUpgrade100.source = "upgrade100g_png";
        this.imgUpgrade.source = 'upgradeg_png';
        this.renderAchieves();
    };
    p.renderUnlocked = function () {
        this.lblLevel.text = this._myProject.level;
        this.lblOutput.text = application.format(this.output());
        this.lblPrice.text = application.format(this._project.priceOf(this._myProject.level + 1));
        this.imgUpgrade10.source = "upgrade10_png";
        this.imgUpgrade100.source = "upgrade100_png";
        this.imgUpgrade.source = 'upgrade_png';
        this.renderAchieves();
    };
    p.upgrade = function (step) {
        var self = this;
        var p = this._project.price(this._myProject.level + 1, step);
        if (application.customer.gold < p) {
            Toast.launch("没有足够的金币");
            return;
        }
        var oldOutput = this.output();
        this._myProject.level += step;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                application.buyOutput(p, 0, self.output() - oldOutput, null, function (succeed, c) {
                    if (succeed) {
                        //升级成功，需要显示新的级别、秒产、升级价格，如果到了成就的级别，还需要显示成就
                        self.renderUnlocked();
                    }
                    else {
                        Toast.launch("升级失败");
                    }
                });
            }
            else {
                Toast.launch("升级失败");
            }
        });
    };
    p.unlock = function () {
        var self = this;
        var p = this._project.priceOf(1);
        if (application.customer.gold < p) {
            Toast.launch("没有足够的金币");
            return;
        }
        self._myProject.unlocked = 0;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                if (self._myProject.sequence < 19) {
                    var project = {};
                    project.customer_id = application.customer.id;
                    project.sequence = self._myProject.sequence + 1;
                    project.unlocked = 1;
                    project.achieve = 0;
                    project.level = 0;
                    application.dao.save("Project", project, function (succeed, proj) {
                        if (succeed) {
                            application.buyOutput(p, 0, self.output(), proj, function (succeed, c) {
                                if (succeed) {
                                    self.renderUnlocked();
                                }
                                else {
                                    Toast.launch("解锁失败");
                                }
                            });
                        }
                        else {
                            Toast.launch("解锁失败");
                        }
                    });
                }
                else {
                    application.buyOutput(p, 0, self.output(), null, function (succeed, c) {
                        if (succeed) {
                            self.renderUnlocked();
                        }
                        else {
                            Toast.launch("解锁失败");
                        }
                    });
                }
            }
            else {
                Toast.launch("解锁失败");
            }
        });
    };
    return ProjectItem;
}(eui.Component));
egret.registerClass(ProjectItem,'ProjectItem');
