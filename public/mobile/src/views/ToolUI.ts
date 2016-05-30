class ToolUI extends eui.Component {
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

    private uiCompHandler():void {
        var self = this;
        
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
        application.dao.fetch("Project",{ customer_id: application.customer.id },{ order: 'sequence asc' },function(succeed, projects) {
            if(succeed && projects.length > 0) {
                for(var i = 0; i < projects.length; i ++){                    
                    self.addProject(projects[i]);
                }
            }
        });
        
        self.imgHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("hit", 100), this);
        },this);
        
        self.imgTime.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("time", 500), this);
        },this);
        
        self.imgTicket.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new BuyToolUI("ticket", 19), this);
        },this);
        
        self.imgVIP.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
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
