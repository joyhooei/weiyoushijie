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
	
	private buy(price: number, step: number): void {
		if (application.customer.diamond < price) {
			Toast.launch("需要" + price.toString() + "钻石");
		} else {
			let oldOutput = this.output();
			this._myProject.level += step;
			application.dao.save("Project",self._myProject, function(succeed, proj) {
				if (succeed) {
					application.buyOutput(0, price, self.output() - oldOutput, self._myProject, function(succeed, c){
						if (succeed) {
							Toast.launch("购买成功");
						} else {
							Toast.launch("购买失败");    
						}
					});
				} else {
					Toast.launch("购买失败");
				}
			});
		}	
	}
	
	private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    }
}
