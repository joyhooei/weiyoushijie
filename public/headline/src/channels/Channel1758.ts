/**
 *
 * @author 
 *
 */

declare var hlmy;

class Channel1758 extends Channel {
	public constructor() {
        super("1758");
        
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
	}
    
    public login(options: any): Q.Promise<any> {
        let self = this;

        application.delay(function(){
            var token = egret.getOption("userToken");
            if (token) {            
                self.resolve(token);
            } else {
                self.reject("授权失败");
            }
        }, 100);
        
        return self.promise();
    }

    public pay(options: any): Q.Promise<any> {
        let self = this;

		hlmy.pay({
			itemCode:options.goodsId, //必填， 道具计费代码, 由 1758 分配，在 1758 开放平台中查看, CP 的不同充值项（或道具商品）需与此一一对应
			txId:options.ext,//可选. CP 产生的此次交易唯一 ID
			state:options.ext //可选. CP 自定义参数 , 1758 平台会在支付结果通知接口中, 把该参数透传给 CP 游戏服务器
		});
		
        return self.promise();
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
