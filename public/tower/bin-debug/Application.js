var application;
(function (application) {
    application.skills = [];
    application.armies = [];
    application.frameRate = 36;
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
        /*
        let logger = log4javascript.getLogger("larksoft");
        let appender = new log4javascript.AjaxAppender(application.baseUrl + "logs");
        appender.setWaitForResponse(false);
        appender.setThreshold(log4javascript.Level.ERROR);
        let layout = new log4javascript.HttpPostDataLayout();
        layout.setCustomField("version", application.version);
        layout.setCustomField("game", application.game);
        appender.setLayout(layout);
        logger.addAppender(appender);
        Utility.takeOverConsole(logger);
        */
        application.dao = new Dao(application.baseUrl + "api/");
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
    function loadCustomer(customer) {
        application.me = customer;
        return Q.Promise(function (resolve, reject, notify) {
            application.skills = [];
            application.armies = [];
            application.dao.fetch("Skill", { customer_id: application.me.attrs.id }).then(function (skills) {
                for (var i = 0; i < skills.length; i++) {
                    application.skills.push(new Skill(skills[i]));
                }
                application.dao.fetch("Army", { customer_id: application.me.attrs.id }).then(function (armies) {
                    for (var i = 0; i < armies.length; i++) {
                        application.armies.push(new Army(armies[i]));
                    }
                    resolve(armies);
                });
            });
        });
    }
    application.loadCustomer = loadCustomer;
    function logined(account) {
        application.token = account.token;
        return Q.Promise(function (resolve, reject, notify) {
            application.dao.fetch("Customer", { id: account.customer_id }, { limit: 1 }).then(function (customers) {
                if (customers.length > 0) {
                    application.me = new Customer(customers[0]);
                    application.channel.track(TRACK_CATEGORY_PLAYER, TRACK_ACTION_ENTER);
                    resolve(customers[0]);
                    //首次登录，需要显示引导页面
                    if (application.me.attrs.metal == 0) {
                        application.guideUI = new GuideUI();
                    }
                }
                else {
                    Toast.launch("获取账号信息失败,请重新进入");
                }
            });
        });
    }
    application.logined = logined;
    function showUI(ui, parent, x, y) {
        if (x && y) {
            ui.x = x - ui.width / 2;
            ui.y = y - ui.height / 2;
        }
        else {
            ui.horizontalCenter = 0;
            ui.verticalCenter = 0;
        }
        var blockUI = new BlockUI();
        blockUI.addChild(ui);
        if (application.guideUI) {
            if (parent) {
                if (parent.contains(application.guideUI)) {
                    parent.addChildAt(blockUI, parent.getChildIndex(application.guideUI));
                }
                else {
                    parent.addChild(blockUI);
                }
            }
            else {
                application.main.homeUI.addChildAt(blockUI, parent.getChildIndex(application.guideUI));
            }
        }
        else {
            if (parent) {
                parent.addChild(blockUI);
            }
            else {
                application.main.homeUI.addChild(blockUI);
            }
        }
        return ui;
    }
    application.showUI = showUI;
    function hideUI(ui) {
        if (ui && ui.parent) {
            if (egret.getQualifiedClassName(ui.parent) == "BlockUI") {
                if (ui.parent.parent) {
                    ui.parent.parent.removeChild(ui.parent);
                }
            }
            ui.parent.removeChild(ui);
        }
        return ui;
    }
    application.hideUI = hideUI;
})(application || (application = {}));
//# sourceMappingURL=Application.js.map