var Channel1758 = (function (_super) {
    __extends(Channel1758, _super);
    function Channel1758() {
        _super.call(this);
        this.name = "1758";
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
    }
    var d = __define,c=Channel1758,p=c.prototype;
    p.login = function () {
        var self = this;
        application.delay(function () {
            var token = egret.getOption("userToken");
            if (token) {
                self.resolve(token);
            }
            else {
                self.reject("授权失败");
            }
        }, 100);
        return self.promise();
    };
    p.pay = function (options) {
        var self = this;
        hlmy.pay({
            itemCode: options.goodsId,
            txId: options.ext,
            state: options.ext //可选. CP 自定义参数 , 1758 平台会在支付结果通知接口中, 把该参数透传给 CP 游戏服务器
        });
        return self.promise();
    };
    p.share = function (options) {
        var self = this;
        hlmy.setShareInfo();
        window['onShareTimeline'] = function () {
            self.resolve();
        };
        return self.promise();
    };
    p.attention = function (options) {
        var self = this;
        application.dao.fetch("Gift", { "category": GiftCategory.Attention, "customer_id": application.customer.id }, { limit: 1 }, function (succeed, gifts) {
            if (succeed && gifts.length > 0) {
                var gift = gifts[0];
                if (gift.locked == 2) {
                    self.reject(new Error("已经领取过礼物"));
                }
                else {
                    if (parseInt(application.customer.channel_data) == 0) {
                        window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5MjQyOTg3MA==&mid=207867528&idx=1&sn=19c7b9";
                    }
                    else {
                        self.resolve();
                    }
                }
            }
            else {
                self.reject("内部错误");
            }
        });
        return self.promise();
    };
    return Channel1758;
}(ChannelEgret));
egret.registerClass(Channel1758,'Channel1758');
