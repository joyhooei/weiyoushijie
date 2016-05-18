class ToolItem extends eui.Component {
    private _myProject: any;
    private _project: any;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
	
	private img100: eui.Image;
	private img900: eui.Image;

    public constructor(myproject: any,project: any,iconName: string,titleName: string) {
        super();

        this._project = project;
        this._myProject = myproject;

        this.skinName = "resource/custom_skins/toolItemSkin.exml";
		
		this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(100, 1);
		}, this);
		
		this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(900, 10);
		}, this);		

        this.imgIcon.source  = iconName;
        this.imgTitle.source = titleName;
    }
	
	private buy(price: number, step: number): void {
        application.showUI(new BuyToolUI("project",price,this._myProject,this._project,step));
	}
}
