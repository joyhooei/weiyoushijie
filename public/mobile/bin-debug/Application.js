var application;
(function (application) {
    function init(main) {
        application.main = main;
        application.baseUrl = "http://weiyugame.leanapp.cn/";
        //application.baseUrl = "http://localhost:3000/";
        application.dao = new Dao(application.baseUrl + "api/", "headlines");
        application.projects = Project.createAllProjects();
        application.units = [
            'k', 'm', 'b', 't',
            'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
            'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', 'II', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
        ];
    }
    application.init = init;
    function login(data) {
        if (data == null || typeof data == "string") {
            var loginInfo = data ? { "loginType": data } : {};
            nest.user.login(loginInfo, application.onLoginCallback);
        }
        else {
            application.onLoginCallback(data);
        }
    }
    application.login = login;
    function onLoginCallback(data) {
        //从后台获取用户信息
        application.dao.rest("login", { token: data.token }, function (succeed, customer) {
            if (succeed) {
                application.customer = customer;
                application.refreshBid(function (bid) {
                    application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                });
            }
            else {
                Toast.launch("获取账号信息失败");
            }
        });
    }
    application.onLoginCallback = onLoginCallback;
    function bidDay() {
        //中午12点开标，所以12点之后的投标算明天的
        var dt = new Date();
        if (dt.getHours() >= 12) {
            dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
        }
        return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    application.bidDay = bidDay;
    function refreshBid(cb) {
        application.dao.fetch("Bid", { succeed: 0, day: application.bidDay(), customer_id: application.customer.id }, { limit: 1 }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                application.bid = bids[0];
            }
            else {
                application.bid = null;
            }
            cb(application.bid);
        });
    }
    application.refreshBid = refreshBid;
    function refreshCustomer(goldAdded, diamondAdded, outputAdded, totalHitsAdded, projEdited) {
        application.main.homeUI.refresh(goldAdded, diamondAdded, outputAdded, totalHitsAdded, projEdited);
    }
    application.refreshCustomer = refreshCustomer;
    function fetchCustomer() {
        application.dao.fetch("Customer", { id: application.customer.id }, {}, function (succeed, customers) {
            if (succeed && customers.length > 0) {
                application.customer = customers[0];
                application.refreshCustomer(application.customer.gold, application.customer.diamond, application.customer.output, application.customer.total_hits, null);
            }
        });
    }
    application.fetchCustomer = fetchCustomer;
    function usableGold() {
        if (application.bid) {
            return application.customer.gold - application.bid.gold;
        }
        else {
            return application.customer.gold;
        }
    }
    application.usableGold = usableGold;
    function buyOutput(gold, diamond, output, proj, cb) {
        application.customer.gold -= gold;
        application.customer.diamond -= diamond;
        application.customer.output += output;
        if (application.customer.output >= 100) {
            if (application.log10(application.customer.output) > application.log10(application.customer.output - output)) {
                application.dao.fetch("Gift", { customer_id: application.customer.id, category: 7 }, { limit: 1 }, function (succeed, gifts) {
                    if (succeed && gifts.length > 0) {
                        var gift = gifts[0];
                        gift.locked = 0;
                        gift.data = application.log10(application.customer.output).toString();
                        application.dao.save("Gift", gift);
                    }
                });
            }
        }
        application.dao.save("Customer", application.customer, function (succeed, c) {
            if (succeed) {
                application.refreshCustomer(0 - gold, 0 - diamond, output, 0, proj);
            }
            cb(succeed, c);
        });
    }
    application.buyOutput = buyOutput;
    function charge() {
        var self = this;
        var order = { customer_id: application.customer.id, product: "diamond", price: 2 };
        application.dao.save("Order", order, function (succeed, o) {
            if (succeed) {
                application.pay("3", o, function (succeed) {
                    if (succeed == 1) {
                        Toast.launch("充值成功");
                    }
                });
            }
            else {
                Toast.launch("充值失败");
            }
        });
    }
    application.charge = charge;
    function pay(goodsId, order, callback) {
        nest.iap.pay({ goodsId: goodsId, goodsNumber: "1", serverId: "1", ext: order.id }, function (data) {
            if (data.result == 0) {
                //支付成功
                callback(1);
            }
            else if (data.result == -1) {
                //支付取消
                Toast.launch("取消了购买");
            }
            else {
                //支付失败
                Toast.launch("支付失败");
            }
        });
    }
    application.pay = pay;
    function share(callback) {
        nest.share.isSupport({}, function (data) {
            if (data.share == 1) {
                var url = application.baseUrl + "mobile/index.html";
                var img_url = application.baseUrl + "mobile/resource/art/home/icon.png";
                nest.share.share({ title: '我要上头条', description: '我要上头条', url: url, img_url: img_url, img_title: '我要上头条' }, function (data) {
                    if (data.result == 0) {
                        callback();
                    }
                    else if (data.result == -1) {
                        Toast.launch("取消了分享");
                    }
                    else {
                        Toast.launch("分享失败");
                    }
                });
            }
            else {
                Toast.launch("当前平台不支持分享");
            }
        });
    }
    application.share = share;
    function attention(callback) {
        nest.app.isSupport({}, function (data) {
            if (data.attention == 1) {
                nest.app.attention({}, function (data) {
                    if (data.result == 0) {
                        callback();
                    }
                    else if (data.result == -1) {
                        Toast.launch("取消了关注");
                    }
                    else {
                        Toast.launch("关注失败");
                    }
                });
            }
            else {
                Toast.launch("当前平台不支持关注");
            }
        });
    }
    application.attention = attention;
    function gotoAuction() {
        application.main.homeUI.gotoPage(GamePages.AUCTION, false);
    }
    application.gotoAuction = gotoAuction;
    function gotoTool() {
        application.main.homeUI.gotoPage(GamePages.TOOL, false);
    }
    application.gotoTool = gotoTool;
    function showHelp(content) {
        if (content.length == 0) {
            content = "微信帮助平台 Amazing微遇游戏\n";
            content += "QQ客服 3369182016\n";
            content += "邮箱 3369182016@qq.com\n";
            content += "玩法\n";
            content += "1. 点击中间舞者可产生金币，金币用来升级运营项目，而运营项目随等级提高从而产生更多的金币。\n";
            content += "2. 金币可以用来参加头条拍卖，每天最高出价者会成为头条，获得头条殊荣，勋章和钻石奖励。\n";
            content += "3. 道具可以帮助玩家快速获得大量金币和永久提高运营项目的每秒产量。\n";
            content += "4. 排行榜会按照勋章的个数排名，勋章数量一致时则按照金币的总量排名。\n";
            content += "金币单位\n";
            for (var i = 0; i < application.units.length; i++) {
                var zeros = ((i + 1) * 3).toString();
                content += zeros + "个0";
                for (var j = zeros.length; j < 10; j++) {
                    content += " ";
                }
                content += application.units[i] + "\n";
            }
        }
        return application.showUI(new HelpUI(content));
    }
    application.showHelp = showHelp;
    function showUI(ui, parent) {
        ui.horizontalCenter = 0;
        ui.verticalCenter = 0;
        if (parent) {
            parent.addChild(ui);
        }
        else {
            application.main.homeUI.addChild(ui);
        }
        return ui;
    }
    application.showUI = showUI;
    function hideUI(ui) {
        if (ui && ui.parent) {
            ui.parent.removeChild(ui);
        }
        return ui;
    }
    application.hideUI = hideUI;
    function format(d) {
        var unit = "";
        try {
            for (var i = 0; i < application.units.length; i++) {
                if (d < 10) {
                    return d.toFixed(2) + unit;
                }
                else if (d < 100) {
                    return d.toFixed(1) + unit;
                }
                else if (d < 1000) {
                    return d.toFixed() + unit;
                }
                else {
                    unit = application.units[i];
                    d = d / 1000;
                }
            }
        }
        catch (error) {
            console.error("format " + d.toString() + " error " + error.message);
        }
        return d.toFixed() + unit;
    }
    application.format = format;
    function log10(d) {
        var result = 0;
        while (d >= 10) {
            result += 1;
            d = d / 10;
        }
        return result;
    }
    application.log10 = log10;
})(application || (application = {}));
