class ToolItem extends eui.Component {
    private _project: Project;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
	
	private img100: eui.Image;
	private img900: eui.Image;

    public constructor(project: Project,iconName: string,titleName: string) {
        super();

        this._project = project;

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/toolItemSkin.exml";

        this.imgIcon.source  = iconName;
        this.imgTitle.source = titleName;
    }
    
    private uiCompHandler(): void {
		this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(100, 1);
		}, this);
		
		this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.buy(900, 10);
		}, this);		
    }
	
	private buy(price: number, level: number): void {
		if (application.customer.diamond < price) {
			//显示充值界面
		} else {
		}	
	}
}
