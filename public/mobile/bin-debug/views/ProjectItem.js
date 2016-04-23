var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project, iconName, title) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        this.imgIcon.source = iconName;
        this.lblTitle.text = title;
    }
    var d = __define,c=ProjectItem,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        if (this._myProject.unlocked == 1) {
            this.renderLocked();
        }
        else {
            this.renderUnlocked();
        }
        this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._myProject.unlocked == 1) {
                _this.unlock();
            }
            else {
                _this.upgrade(1);
            }
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
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    };
    p.renderAchieves = function () {
        this.grpAchieve.removeChildren();
        for (var i = 1; i <= 10; i++) {
            var imgAchieve = new eui.Image();
            if (i < this._myProject.achieve) {
                imgAchieve.source = "acv" + i.toString() + "_png";
                imgAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //show help
                }, this);
            }
            else {
                if (i == this._myProject.achieve + 1 && (this._project.diamondPriceOfAchieve(i) <= application.customer.diamond || this._project.goldPriceOfAchieve(i) <= application.customer.gold)) {
                    imgAchieve.source = "acvlock_png";
                }
                else {
                    imgAchieve.source = "acvlock_png";
                }
                imgAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //show buy options
                }, this);
            }
            this.grpAchieve.addChild(imgAchieve);
        }
    };
    p.renderLocked = function () {
        this.lblLevel.text = "0";
        this.lblOutput.text = "0";
        this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
        this.imgUpgrade10.source = "MPbx10_jpg";
        this.imgUpgrade100.source = "MPBx100_jpg";
        this.imgUpgrade.source = 'UpgradeG_png';
        this.renderAchieves();
    };
    p.renderUnlocked = function () {
        this.lblLevel.text = this._myProject.level;
        this.lblOutput.text = this.output().toString();
        this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
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
                Toast.launch("解锁失败");
            }
        });
    };
    p.buyAchieveUseGold = function () {
        var self = this;
        var p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.gold < p) {
            Toast.launch("没有足够的金币");
            return;
        }
        var oldOutput = self.output();
        self._myProject.achieve += 1;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                var newOutput = self.output();
                application.buyOutput(p, 0, newOutput - oldOutput, null, function (succeed, c) {
                    if (succeed) {
                        self.renderUnlocked();
                    }
                    else {
                        Toast.launch("获得成就失败");
                    }
                });
            }
            else {
                Toast.launch("获得成就失败");
            }
        });
    };
    p.buyAchieveUseDiamond = function () {
        var self = this;
        var p = self._project.diamondPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.diamond < p) {
            Toast.launch("没有足够的钻石");
            return;
        }
        var oldOutput = self.output();
        self._myProject.achieve += 1;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                var newOutput = self.output();
                application.buyOutput(0, p, newOutput - oldOutput, null, function (succeed, c) {
                    if (succeed) {
                        self.renderUnlocked();
                    }
                    else {
                        Toast.launch("获得成就失败");
                    }
                });
            }
            else {
                Toast.launch("获得成就失败");
            }
        });
    };
    return ProjectItem;
}(eui.Component));
egret.registerClass(ProjectItem,'ProjectItem');
