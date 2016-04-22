/**
 *
 * @author
 *
 */
var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project, myProp, iconName) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this._myProp = myProp;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        this.imgIcon.source = iconName;
        for (var i = 1; i <= 10; i++) {
            var imgAchieve = new eui.Image();
            imgAchieve.source = "acv" + i.toString() + "_png";
            this.grpAchieve.addChild(imgAchieve);
        }
    }
    var d = __define,c=ProjectItem,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        if (this._myProject.unlocked == 1) {
            this.lblLevel.text = "0";
            this.lblOutput.text = "0";
            this.imgUpgrade10.source = "MPbx10_jpg";
            this.imgUpgrade100.source = "MPBx100_jpg";
            this.imgUpgrade.source = 'UpgradeG_png';
            var p = this._project.priceOf(1);
            this.lblPrice.text = p.toString();
            if (application.customer.gold >= p) {
                this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.unlock();
                }, this);
            }
        }
        else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level, this._myProject.achieve, this._myProp).toString();
            this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
            var p = this._project.price(this._myProject.level + 1, 1);
            if (application.customer.gold > p) {
                this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.upgrade(1);
                }, this);
            }
            else {
            }
            p = this._project.price(this._myProject.level + 1, 10);
            if (application.customer.gold > p) {
                this.imgUpgrade10.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.upgrade(10);
                }, this);
            }
            else {
            }
            p = this._project.price(this._myProject.level + 1, 10);
            if (application.customer.gold > p) {
                this.imgUpgrade100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.upgrade(100);
                }, this);
            }
            else {
            }
        }
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    };
    p.upgrade = function (step) {
        var self = this;
        var p = this._project.price(this._myProject.level + 1, step);
        var oldOutput = this.output();
        if (application.customer.gold > p) {
            this._myProject.level += step;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    application.buyOutput(p, 0, self.output() - oldOutput, function (succeed, c) {
                        if (succeed) {
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
        }
    };
    p.unlock = function () {
        var self = this;
        var p = this._project.priceOf(1);
        if (application.customer.gold >= p) {
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
                            application.buyOutput(p, 0, self.output(), function (succeed, c) {
                                if (succeed) {
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
        }
    };
    p.buyAchieveUseGold = function () {
        var self = this;
        var p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        var oldOutput = self.output();
        if (application.customer.gold > p) {
            this._myProject.achieve += 1;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    var newOutput = self.output();
                    application.buyOutput(p, 0, newOutput - oldOutput, function (succeed, c) {
                        if (succeed) {
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
        }
    };
    p.buyAchieveUseDiamond = function () {
        var self = this;
        var p = this._project.diamondPriceOfAchieve(this._myProject.acheve + 1);
        var oldOutput = this.output();
        if (application.customer.diamond > p) {
            this._myProject.achieve += 1;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    var newOutput = self.output();
                    application.buyOutput(0, p, newOutput - oldOutput, function (succeed, c) {
                        if (succeed) {
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
        }
    };
    return ProjectItem;
}(eui.Component));
egret.registerClass(ProjectItem,'ProjectItem');
