/**
 *
 * @author
 *
 */
var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(myProject, project, myProp) {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/ProjectItemSkin.exml";
        this._myProject = myProject;
        this._project = project;
        this._myProp = myProp;
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
            this.lblPrice.text = this._project.price(this._myProject.level + 1).toString();
        }
    };
    return ProjectItem;
})(eui.Component);
egret.registerClass(ProjectItem,'ProjectItem');
