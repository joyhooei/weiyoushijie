/**
 * Created by yjtx on 15-10-19.
 */
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        _super.call(this);
    }
    var d = __define,c=Login,p=c.prototype;
    p.login = function (data) {
        if (data == null || typeof data == "string") {
            var loginInfo = data ? { "loginType": data } : {};
            egret.log("login start");
            egret.log(JSON.stringify(loginInfo));
            nest.user.login(loginInfo, this.onLoginCallback.bind(this));
        }
        else {
            this.onLoginCallback(data);
        }
    };
    p.onLoginCallback = function (data) {
        egret.log(JSON.stringify(data));
        egret.log("login end");
        if (data.result == 0) {
            //为了保证安全性，这段代码请务必放在服务器端实现
            this.getUserInfo(data, this.onGetUserInfoCallback);
        }
        else {
        }
    };
    p.getUserInfo = function (data, onGetUserInfoCallback) {
    };
    p.onGetUserInfoCallback = function (data) {
        console.log(data);
    };
    return Login;
})(egret.EventDispatcher);
egret.registerClass(Login,'Login');
