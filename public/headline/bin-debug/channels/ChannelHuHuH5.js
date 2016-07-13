var ChannelHuHuH5 = (function (_super) {
    __extends(ChannelHuHuH5, _super);
    function ChannelHuHuH5(standalone) {
        _super.call(this, standalone);
        this.loadjs('http://server.huhuh5.com:8081/3HGame/jsFile/h5Game.js');
    }
    var d = __define,c=ChannelHuHuH5,p=c.prototype;
    p.login = function () {
        var self = this;
        window['loginCallBcak'] = function (userId, userName, userImage, userPosition, token) {
            application.dao.rest("login", { token: token, wysj_channel: "huhuh5", userId: userId, userName: userName, userImage: userImage, userPosition: userPosition }, function (succeed, account) {
                if (succeed) {
                    self.resolve(account);
                }
                else {
                    self.reject("登录失败");
                }
            });
        };
        h5Game.login('loginCallBcak');
        return self.promise();
    };
    p.pay = function (options) {
        var self = this;
        window['payCallBcak'] = function (orderId, status) {
            if (status == 'SUCCESS') {
                self.resolve();
            }
            else if (status == 'CANCEL') {
                self.reject("取消了支付");
            }
            else {
                self.reject("支付失败");
            }
        };
        var data = {
            goodsId: options.goodsId,
            goodsName: options.goodsName,
            goodsNum: options.goodsNumber,
            money: options.money,
            orderId: options.orderId,
        };
        h5Game.pay(data, 'payCallBcak');
        return self.promise();
    };
    p.share = function (options) {
        var self = this;
        window['shareCallBcak'] = function () {
            self.resolve();
        };
        h5Game.share("shareCallBcak");
        return self.promise();
    };
    p.track = function (category, action, opt_label, opt_value) {
        _super.prototype.track.call(this, category, action, opt_label, opt_value);
        switch (category) {
            case TRACK_CATEGORY_PLAYER:
                if (action == TRACK_ACTION_ENTER) {
                }
                else {
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