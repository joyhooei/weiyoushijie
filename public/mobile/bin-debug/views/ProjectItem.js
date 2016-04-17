/**
 *
 * @author
 *
 */
var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project, myProp) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this._myProp = myProp;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
    }
    var d = __define,c=ProjectItem,p=c.prototype;
    p.uiCompHandler = function () {
        if (this._myProject.unlocked == 1) {
            this.lblLevel.text = "";
            this.lblOutput.text = "";
            this.lblPrice.text = "";
        }
        else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level, this._myProject.achieve, this._myProp).toString();
            this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
        }
    };
    p.upgrade = function (step) {
        var self = this;
        var p = this._project.price(this._myProject.level + 1, step);
        var oldOutput = this._project.output(this._myProject.level, application.customer.achieve, application.customer.prop);
        if (application.customer.gold > p) {
            this._myProject.level += step;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    application.customer.gold -= p;
                    application.customer.output += self._project.output(self._myProject.level, application.customer.achieve, application.customer.prop) - oldOutput;
                    application.dao.save("Customer", application.customer, function (succeed, c) {
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
        if (application.customer.gold > p) {
            self._myProject.unlocked = 1;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    application.customer.gold -= p;
                    application.customer.output += self._project.output(self._myProject.level, application.customer.achieve, application.customer.prop);
                    application.dao.save("Customer", application.customer, function (succeed, c) {
                        if (succeed) {
                            var project;
                            project.customer_id = application.customer.id;
                            project.sequence = self._myProject.sequence + 1;
                            project.unlocked = 0;
                            project.achieve = 0;
                            project.level = 0;
                            application.dao.save("Project", project, function (succeed, proj) {
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
    return ProjectItem;
})(eui.Component);
egret.registerClass(ProjectItem,'ProjectItem');
