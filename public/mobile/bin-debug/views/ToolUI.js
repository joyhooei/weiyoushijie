var ToolUI = (function (_super) {
    __extends(ToolUI, _super);
    function ToolUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }
    var d = __define,c=ToolUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.back();
        }, this);
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 0;
        tLayout.requestedColumnCount = 2; /// 设置两列显示
        this.grpProject.layout = tLayout; /// 网格布局
        self.grpProject.removeChildren();
        application.dao.fetch("Project", { customer_id: application.customer.id }, { order: 'sequence asc' }, function (succeed, projects) {
            if (succeed && projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    self.addProject(projects[i]);
                }
            }
        });
        self.imgHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.buyHit();
        }, this);
        self.imgTime.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.buyTime();
        }, this);
        self.imgTicket.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.buyTicket();
        }, this);
        self.imgVIP.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.buyVIP();
        }, this);
    };
    //爆击。每4小时自动获取一个，最多拥有3个。“点击”可以获取10倍的收益，持续60秒。100钻石可以增加至3个。说明里提醒玩家先用完已有的，再购买，因为最多只能拥有3个。
    p.buyHit = function () {
        var order = { customer_id: application.customer.id, product: "hit" };
        application.dao.save("Order", order, function (succeed, o) {
            if (succeed) {
                application.fetchCustomer();
                Toast.launch("购买了爆击");
            }
            else {
                Toast.launch("购买失败");
            }
        });
    };
    //时光沙漏， 需要500钻石购买，产生相当于2天的产量。 总秒产*3600*48
    p.buyTime = function () {
        var order = { customer_id: application.customer.id, product: "time" };
        application.dao.save("Order", order, function (succeed, o) {
            if (succeed) {
                application.fetchCustomer();
                Toast.launch("购买了时光沙漏");
            }
            else {
                Toast.launch("购买失败");
            }
        });
    };
    //月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    p.buyTicket = function () {
        var order = { customer_id: application.customer.id, product: "ticket" };
        application.dao.save("Order", order, function (succeed, o) {
            if (succeed) {
                application.fetchCustomer();
                Toast.launch("购买了月票");
            }
            else {
                Toast.launch("购买失败");
            }
        });
    };
    //终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    p.buyVIP = function () {
        var order = { customer_id: application.customer.id, product: "vip" };
        application.dao.save("Order", order, function (succeed, o) {
            if (succeed) {
                application.fetchCustomer();
                Toast.launch("购买了终身VIP");
            }
            else {
                Toast.launch("购买失败");
            }
        });
    };
    p.addProject = function (proj) {
        if (proj) {
            var i = proj.sequence;
            var item = new ToolItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
            this.grpProject.addChildAt(item, i);
        }
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    return ToolUI;
}(eui.Component));
egret.registerClass(ToolUI,'ToolUI');
