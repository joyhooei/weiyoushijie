var Channel51H5 = (function (_super) {
    __extends(Channel51H5, _super);
    function Channel51H5(standalone) {
        _super.call(this, standalone);
        this.appId = "y6k9mjsn";
    }
    var d = __define,c=Channel51H5,p=c.prototype;
    p.loginQuietly = function () {
        var self = this;
        if (egret.getOption("code")) {
            self.rest("51h5", "login", { token: egret.getOption("code") }).then(function (account) {
                self.resolve(account);
            }, function (error) {
                self.reject("登录失败");
            });
            return self.promise();
        }
        else {
            return self.rejectedPromise();
        }
    };
    p.login = function () {
        var self = this;
        location.href = 'http://web.51h5.com/sso.html?appid=' + this.appId
            + '&redirect=' + encodeURIComponent(application.baseUrl + "/headline/index.html?wysj_channel=51h5");
        return self.promise();
    };
    p.pay = function (options) {
        var self = this;
        options.customer_id = application.me.attrs.id;
        self.rest("51h5", "51h5_pay_url", options).then(function (data) {
            location.href = data.pay_url;
        }, function (error) {
            self.reject("支付失败");
        });
        return self.promise();
    };
    return Channel51H5;
}(Channel));
egret.registerClass(Channel51H5,'Channel51H5');
