var application;
(function (application) {
    function init(main) {
        application.main = main;
        application.router = new Router(main);
        application.dao = new Dao("http://headlines.leanapp.cn/api/");
        //application.dao = new Dao("http://localhost:3000/api/");
        application.projects = Project.createAllProjects();
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
        application.dao.rest("login", { token: data.token }, function (succeed, data) {
            if (succeed) {
                application.customer = data;
                application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
            }
            else {
                Toast.launch("获取账号信息失败");
            }
        });
    }
    application.onLoginCallback = onLoginCallback;
    function buyOutput(gold, diamond, output, proj, cb) {
        application.customer.gold -= gold;
        application.customer.diamond -= diamond;
        application.customer.output += output;
        application.dao.save("Customer", application.customer, function (succeed, c) {
            if (succeed) {
                application.main.homeUI.animateCustomer(gold, diamond, output, proj);
            }
            cb(succeed, c);
        });
    }
    application.buyOutput = buyOutput;
    function format(d) {
        var units = [
            'k', 'm', 'b', 't',
            'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
            'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', 'II', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
        ];
        var unit = "";
        for (var i = 0; i < units.length; i++) {
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
                unit = units[i];
                d = d / 1000;
            }
        }
        return d.toFixed() + unit;
    }
    application.format = format;
})(application || (application = {}));
