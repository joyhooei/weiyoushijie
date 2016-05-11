class ToolItem extends eui.Component {
    private _project: Project;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;

    public constructor(project: Project,iconName: string,titleName: string) {
        super();

        this._project = project;

        this.skinName = "resource/custom_skins/toolItemSkin.exml";

        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
    }
}
