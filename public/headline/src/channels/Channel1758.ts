/**
 *
 * @author 
 *
 */

declare var hlmy;

class Channel1758 extends Channel {
	public constructor() {
        super();
        
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
	}
	
    public share(options: any): Q.Promise<any> {
        let self = this;

        hlmy.setShareInfo({
            state: application.customer.id, //（选填，CP 设置分享链接的自定义参数，当用户点击分享链接时，该参数会透传到用CP 的游戏授权回调地址 url 中；同时，CP 服务器收到的邀请结果通知接口中也会透传该参数）
            tipInfo: true, //(必填，true，立即显示 1758JS- SDK 的分享提示页面；false，不显示 1758JS- SDK的分享提示界面)
            reward: ['100'] //（当 tipInfo 为 true 时，必填。数组，为奖励的内容，格式：’元宝 X10’；数组的每项内容在显示时会单独占一行）
        });
        
        return self.promise();
    }

    public attention(options: any): Q.Promise<any> {
        let self = this;

        application.dao.fetch("Gift", {"category": GiftCategory.Attention, "customer_id": application.customer.id}, {limit: 1}, function(succeed, gifts){
            if (succeed && gifts.length > 0) {
                let gift = gifts[0];
                
                if(gift.locked  == 2) {
                    self.reject(new Error("已经领取过礼物"));
                } else {
                    application.dao.rest("get_user_info",{ channel: '1758',key: application.customer.uid },function(succeed,result) {
                        if(succeed) {
                            if(result.subscribe == 0) {
                                window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5MjQyOTg3MA==&mid=207867528&idx=1&sn=19c7b9";
                            } else {
                                self.resolve();
                            }
                        } else {
                            self.reject("找不到玩家信息");
                        }
                    });
                }
            } else {
                self.reject("内部错误");
            }
        })

        return self.promise();
    }
}
