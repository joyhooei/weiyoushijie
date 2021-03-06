class ToolUI extends eui.Component {
    private imgBack: eui.Button;

    public lblGold: eui.Label;
    public lblDiamond: eui.Label;
    
    private btnAddGold: eui.Button;
    private btnAddDiamond: eui.Button;

    private imgHit: eui.Image;
    private imgTime: eui.Image;
    private imgTicket: eui.Image;
    private imgVIP: eui.Image;
    
    private grpProject: eui.List;
    
    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }
    
    public refresh(): void {
        var self = this;

        this.lblGold.text = Utility.format(application.me.usableGold());
        this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
      
        var tLayout: eui.TileLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.TOP;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 0;
        tLayout.requestedColumnCount = 2;  /// 设置两列显示
        this.grpProject.layout = tLayout;    /// 网格布局
        
        self.grpProject.removeChildren();
        application.dao.fetch("Project",{ customer_id: application.me.attrs.id },{ order: 'sequence asc' }).then(function(projects) {
            for(var i = 0; i < projects.length; i ++){                    
                self.addProject(projects[i]);
            }
        });
    }
    
    private uiCompHandler():void {
        this.refresh();

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.gotoHome();
        },this);

        application.dao.addEventListener("Customer",function(evt: egret.Event) {
            this.lblGold.text = Utility.format(application.me.usableGold());
            this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
        },this);

        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("time",500));
        },this);

        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new ChargeTipUI());
        },this);
        
        this.imgHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("hit", 100), this);
        },this);
        
        this.imgTime.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("time", 500), this);
        },this);
        
        this.imgTicket.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("ticket", 19), this);
        },this);
        
        this.imgVIP.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("vip", 49), this);
        },this);
    }
    
	private addProject(proj) {
    	if (proj && proj.unlocked == 0) {
            let i = proj.sequence;
            let item: ToolItem = new ToolItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
            this.grpProject.addChildAt(item,i);
        }
	}
}
