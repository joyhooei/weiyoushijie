var ToolItem = (function (_super) {
    __extends(ToolItem, _super);
    function ToolItem(project, iconName, titleName) {
        _super.call(this);
        this._project = project;
        this.skinName = "resource/custom_skins/toolItemSkin.exml";
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
    }
    var d = __define,c=ToolItem,p=c.prototype;
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
