var application;
(function (application) {
    application.ticks = 0;
    application.version = '1.1.1';
    application.game = 'tower';
    application.token = "";
    application.development = 0;
    function init(main) {
        application.main = main;
        if (egret.getOption("wysj_development")) {
            application.development = 1;
        }
        var url = egret.getOption("wysj_server");
        if (url && url.length > 1) {
            application.baseUrl = url;
        }
        else {
            application.baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + "/";
        }
        var logger = log4javascript.getLogger("larksoft");
        var appender = new log4javascript.AjaxAppender(application.baseUrl + "logs");
        appender.setWaitForResponse(false);
        appender.setThreshold(log4javascript.Level.ERROR);
        var layout = new log4javascript.HttpPostDataLayout();
        layout.setCustomField("version", application.version);
        layout.setCustomField("game", application.game);
        appender.setLayout(layout);
        logger.addAppender(appender);
        Utility.takeOverConsole(logger);
        application.dao = new Dao(application.baseUrl + "api/", application.game);
        application.channel = Channel.create();
        application.characters = Character.createAll();
        application.pool = new EntityPool();
        application.stopwatch = new egret.EventDispatcher();
        var timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            application.ticks++;
            application.stopwatch.dispatchEventWith("second", true, application.ticks);
            if (application.ticks % 60 == 0) {
                application.stopwatch.dispatchEventWith("minute", true, application.ticks / 60);
                if (application.ticks % 3600 == 0) {
                    application.stopwatch.dispatchEventWith("hour", true, application.ticks / 3600);
                }
            }
        }, this);
        timer.start();
        window.onunload = function () {
            if (application.me) {
                application.me.saveNow();
            }
        };
    }
    application.init = init;
    function logined(account) {
        application.token = account.token;
        application.dao.fetch("Customer", { id: account.customer_id }, { limit: 1 }).then(function (customers) {
            if (customers.length > 0) {
                application.me = new Customer(customers[0]);
                application.channel.track(TRACK_CATEGORY_PLAYER, TRACK_ACTION_ENTER);
                //首次登录，需要显示引导页面
                if (application.me.attrs.metal == 0) {
                    application.guideUI = new GuideUI();
                }
            }
            else {
                Toast.launch("获取账号信息失败,请重新进入");
            }
        });
    }
    application.logined = logined;
    function showUI(ui, parent) {
        ui.horizontalCenter = 0;
        ui.verticalCenter = 0;
        if (!application.blockUI) {
            application.blockUI = new BlockUI();
        }
        application.blockUI.addChild(ui);
        if (application.guideUI) {
            if (parent) {
                if (parent.contains(application.guideUI)) {
                    parent.addChildAt(application.blockUI, parent.getChildIndex(application.guideUI));
                }
                else {
                    parent.addChild(application.blockUI);
                }
            }
            else {
                application.main.homeUI.addChildAt(application.blockUI, parent.getChildIndex(application.guideUI));
            }
        }
        else {
            if (parent) {
                parent.addChild(application.blockUI);
            }
            else {
                application.main.homeUI.addChild(application.blockUI);
            }
        }
        return ui;
    }
    application.showUI = showUI;
    function hideUI(ui) {
        if (ui && ui.parent) {
            if (ui.parent == application.blockUI) {
                if (application.blockUI.numChildren <= 2) {
                    if (ui.parent.parent) {
                        ui.parent.parent.removeChild(application.blockUI);
                    }
                }
                application.blockUI.removeChild(ui);
            }
            else {
                ui.parent.removeChild(ui);
            }
        }
        return ui;
    }
    application.hideUI = hideUI;
})(application || (application = {}));
//# sourceMappingURL=Application.js.map