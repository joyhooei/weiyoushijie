var application;
(function (application) {
    function init(main) {
        application.main = main;
        application.router = new Router(main);
        application.dao = new Dao("http://headlines.leanapp.cn/api/");
        //application.dao = new Dao("http://localhost:3000/api/");
    }
    application.init = init;
    function login(data) {
        if (data == null || typeof data == "string") {
            var loginInfo = data ? { "loginType": data } : {};
            egret.log(JSON.stringify(loginInfo));
            nest.user.login(loginInfo, application.onLoginCallback);
        }
        else {
            application.onLoginCallback(data);
        }
    }
    application.login = login;
    function onLoginCallback(data) {
        egret.log(JSON.stringify(data));
        if (data.result == 0) {
            //从后台获取用户信息
            application.dao.rest("login", { token: data.token }, function (succeed, data) {
                if (succeed) {
                    application.account = data;
                    application.dao.fetch("Customer", { "id": application.account.customer_id }, {}, function (succeed, data) {
                        if (succeed) {
                            application.customer = data[0];
                            application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                        }
                        else {
                            Toast.launch("获取用户信息失败");
                        }
                    });
                }
                else {
                    Toast.launch("获取账号信息失败");
                }
            });
        }
        else {
            Toast.launch("登录失败");
        }
    }
    application.onLoginCallback = onLoginCallback;
})(application || (application = {}));
