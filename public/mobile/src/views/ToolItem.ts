class ToolItem extends eui.Component {
    private _myproject: any;
    private _project: any;

    private imgIcon: eui.Image;
    private imgTitle: eui.Image;
	
	private img100: eui.Image;
	private img900: eui.Image;

    public constructor(myproject: any,project: any,iconName: string,titleName: string) {
        super();

        this._project = project;
        this._myproject = myproject;

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
			Toast.launch("钻石不够");
		} else {
			var order = { customer_id: application.customer.id, product: "project_" + this._project.sequence + "_" + level};
			application.dao.save("Order", order, function(succeed, o) {
				if (succeed) {
					application.fetchCustomer();

					Toast.launch("购买了运营");
				} else {
					Toast.launch("购买失败");
				}
			});
		}	
	}
}
