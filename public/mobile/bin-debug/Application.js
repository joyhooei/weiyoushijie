var application;
(function (application) {
    function init(main) {
        application.main = main;
        application.router = new Router(main);
        //application.dao = new Dao("http://headlines.leanapp.cn/api/");
        application.dao = new Dao("http://localhost:3000/api/");
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
})(application || (application = {}));
