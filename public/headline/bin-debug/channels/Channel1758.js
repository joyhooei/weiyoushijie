/**
 *
 * @author
 *
 */
var Channel1758 = (function (_super) {
    __extends(Channel1758, _super);
    function Channel1758() {
        _super.call(this);
        loadfile("http://wx.1758.com/static/common/js/hlmy1758.js", "js");
    }
    var d = __define,c=Channel1758,p=c.prototype;
    p.share = function (options) {
        var self = this;
        hlmy.setShareInfo({
            state: application.customer.id,
            tipInfo: true,
            reward: ['100'] //（当 tipInfo 为 true 时，必填。数组，为奖励的内容，格式：’元宝 X10’；数组的每项内容在显示时会单独占一行）
        });
        return self.promise();
    };
    p.attention = function (options) {
        var self = this;
        application.dao.fetch("Gift", { "category": GiftCategory.Attention, "customer_id": application.customer.id }, { limit: 1 }, function (succeed, gifts) {
            if (succeed && gifts.length > 0) {
                var gift_1 = gifts[0];
                if (gift_1.locked == 2) {
                    self.reject(new Error("已经领取过礼物"));
                }
                else {
                    application.dao.rest("get_user_info", { channel: '1758', key: application.customer.uid }, function (succeed, result) {
                        if (succeed) {
                            if (result.subscribe == 0) {
                                window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5MjQyOTg3MA==&mid=207867528&idx=1&sn=19c7b9";
                            }
                            else {
                                self.resolve(gift_1);
                            }
                        }
                        else {
                            self.reject("找不到玩家信息");
                        }
                    });
                }
            }
            else {
                self.reject("内部错误");
            }
        });
        return self.promise();
    };
    return Channel1758;
}(Channel));
egret.registerClass(Channel1758,'Channel1758');
