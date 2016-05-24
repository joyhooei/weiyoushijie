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
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
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
            this.buyHit();
        },this);
        
        self.imgTime.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.buyTime();
        },this);
        
        self.imgTicket.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.buyTicket();
        },this);
        
        self.imgVIP.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.buyVIP();
        },this);
    }
    
	//爆击。每4小时自动获取一个，最多拥有3个。“点击”可以获取10倍的收益，持续60秒。100钻石可以增加至3个。说明里提醒玩家先用完已有的，再购买，因为最多只能拥有3个。
    private buyHit() {
        if (application.customer.total_hits < 3) {
		    application.showUI(new BuyToolUI("hit", 100));
        } else {
            Toast.launch("你已经有3个爆击，不能再购买了");
        }
    }
    
	//时光沙漏， 需要500钻石购买，产生相当于2天的产量。 总秒产*3600*48
    private buyTime() {
		application.showUI(new BuyToolUI("time", 500));
    }
    
	//月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    private buyTicket() {
		var self = this;
		
        var order = { customer_id: application.customer.id, product: "ticket", price: 19};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				application.pay("1", o, function(succeed){
					if (succeed == 1) {
						Toast.launch("购买了月票");
					}
				});
            } else {
                Toast.launch("购买失败");
            }
        });
    }
    
	//终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    private buyVIP() {
        var self = this;
        
        var order = { customer_id: application.customer.id, product: "vip", price: 49};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				application.pay("2", o, function(succeed){
					if (succeed == 1) {
						Toast.launch("购买了终身VIP");
					}
				});			
            } else {
                Toast.launch("购买失败");
            }
        });
    }
    
	private addProject(proj) {
    	if (proj) {
            let i = proj.sequence;
            let item: ToolItem = new ToolItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
            this.grpProject.addChildAt(item,i);
        }
	}
    
    private back(): void {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    }
}
