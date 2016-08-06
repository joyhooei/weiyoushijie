window['huhuh5_loginCallBcak'] = function (userId, userName, userImage, userPosition, token) {
    var options = { token: token, userId: userId, userName: userName, userImage: userImage, userPosition: userPosition };
    console.log("huhuh5_loginCallBcak" + JSON.stringify(options));
    var channel = application.channel;
    channel.rest("huhuh5", "login", options).then(function (account) {
        channel.resolve(account);
    }, function (error) {
        console.error("huhuh5_loginCallBcak login failed ");
        channel.reject("登录失败");
    });
};
window['huhuh5_shareCallBcak'] = function () {
    application.channel.resolve();
};
window['huhuh5_payCallBcak'] = function (orderId, status) {
    console.log("huhuh5_payCallBcak" + orderId + " " + status);
    var channel = application.channel;
    if (status == 'SUCCESS') {
        channel.resolve();
    }
    else if (status == 'CANCEL') {
        channel.reject("取消了支付");
    }
    else {
        channel.reject("支付失败");
    }
};
var ChannelHuHuH5 = (function (_super) {
    __extends(ChannelHuHuH5, _super);
    function ChannelHuHuH5(standalone) {
        _super.call(this, standalone);
        this.url = 'http://server.huhuh5.com:8081/3HGame/jsFile/h5Game.js';
    }
    var d = __define,c=ChannelHuHuH5,p=c.prototype;
    p.login = function () {
        var self = this;
        self.require(self.url).then(function () {
            h5Game.login('huhuh5_loginCallBcak');
        });
        return self.promise();
    };
    p.pay = function (options) {
        var self = this;
        var data = {
            goodsId: options.goodsId,
            goodsName: options.goodsName,
            goodsNum: options.goodsNumber,
            money: options.money,
            orderId: options.orderId,
        };
        h5Game.pay(data, 'huhuh5_payCallBcak');
        return self.promise();
    };
    p.share = function (options) {
        var self = this;
        h5Game.share("huhuh5_shareCallBcak");
        return self.promise();
    };
    p.track = function (category, action, opt_label, opt_value) {
        _super.prototype.track.call(this, category, action, opt_label, opt_value);
        switch (category) {
            case TRACK_CATEGORY_PLAYER:
                if (action == TRACK_ACTION_ENTER) {
                    h5Game.gameStart();
                }
                else {
                    h5Game.setGameStatus();
                }
                return;
            case TRACK_CATEGORY_DIAMOND:
                if (action == TRACK_ACTION_INC) {
                }
                else {
                }
                return;
            case TRACK_CATEGORY_GOLD:
                if (action == TRACK_ACTION_INC) {
                }
                else {
                }
                return;
            case TRACK_CATEGORY_ACTIVITY:
                return;
            case TRACK_CATEGORY_GUIDE:
                return;
            case TRACK_CATEGORY_RESOURCE:
                return;
        }
    };
    return ChannelHuHuH5;
}(Channel));
egret.registerClass(ChannelHuHuH5,'ChannelHuHuH5');
//# sourceMappingURL=ChannelHuHuH5.js.map