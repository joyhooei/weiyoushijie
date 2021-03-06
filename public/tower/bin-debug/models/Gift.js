var GiftCategory;
(function (GiftCategory) {
    GiftCategory[GiftCategory["Login"] = 1] = "Login";
    GiftCategory[GiftCategory["Online"] = 2] = "Online";
    GiftCategory[GiftCategory["Bid"] = 3] = "Bid";
    GiftCategory[GiftCategory["Ticket"] = 4] = "Ticket";
    GiftCategory[GiftCategory["Share"] = 5] = "Share";
    GiftCategory[GiftCategory["Charge"] = 6] = "Charge";
    GiftCategory[GiftCategory["Output"] = 7] = "Output";
    GiftCategory[GiftCategory["Attention"] = 8] = "Attention";
})(GiftCategory || (GiftCategory = {}));
var Gift = (function () {
    function Gift() {
    }
    var d = __define,c=Gift,p=c.prototype;
    Gift.notify = function () {
        application.dao.dispatchEventWith("Gift", true, null);
    };
    Gift.hasGift = function (gifts) {
        for (var i = 0; i < gifts.length; i++) {
            if (gifts[i].locked == 0) {
                return true;
            }
        }
        return false;
    };
    Gift.check = function (customer) {
        return Q.Promise(function (resolve, reject, notify) {
            application.dao.fetch("Gift", { customer_id: customer.attrs.id }, { order: 'category ASC' }).then(function (gifts) {
                if (gifts.length > 0) {
                    //如果到了第二天，将所有已经领取礼物重新修改为可以领取
                    var day = 1000 * 60 * 60 * 24;
                    var now = new Date();
                    var nowaday = now.getDate();
                    for (var i = 0; i < gifts.length; i++) {
                        var gift = gifts[i];
                        //可以领取的不要更新
                        if (gift.locked == 0) {
                            continue;
                        }
                        if (gift.last_pick_day) {
                            var lastPickDay = (new Date(gift.last_pick_day)).getDate();
                        }
                        else {
                            var dt = new Date();
                            dt.setTime(now.getTime() - day);
                            var lastPickDay = dt.getDate();
                        }
                        //首充奖励只有一次
                        //关注只有一次
                        //今天已经领取过了
                        if (gift.category == GiftCategory.Charge || gift.category == GiftCategory.Attention || nowaday == lastPickDay) {
                            continue;
                        }
                        if (gift.category == GiftCategory.Online) {
                            //在线已经过了一小时，可以领取了
                            var lastLogin = new Date(customer.attrs.last_login);
                            var diff = Math.floor((now.getTime() - lastLogin.getTime()) / 1000);
                            if (diff >= 3600) {
                                gift.locked = 0;
                            }
                            else {
                                gift.data = (3600 - diff).toString();
                                gift.locked = 1;
                            }
                        }
                        else if (gift.category == GiftCategory.Ticket) {
                            customer.checkTicket();
                            if (customer.attrs.vip > 0) {
                                gift.locked = 0;
                            }
                            else {
                                gift.locked = 1;
                            }
                        }
                        else if (gift.category == GiftCategory.Output) {
                            var nextOutput = +gift.data;
                            var nextOutputLog = Utility.log10(nextOutput);
                            var outputLog = Utility.log10(customer.attrs.output);
                            //如果用户的秒产超过了下一个可以领取的秒产，则解锁
                            if (outputLog >= nextOutputLog) {
                                gift.locked = 0;
                            }
                        }
                        else {
                            gift.locked = 1;
                        }
                    }
                    resolve(gifts);
                }
                else {
                    reject('没有礼物');
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    return Gift;
}());
egret.registerClass(Gift,'Gift');
//# sourceMappingURL=Gift.js.map