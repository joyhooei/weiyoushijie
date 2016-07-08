declare var hlmy;

class Channel1758 extends ChannelEgret {
	public constructor() {
        super();
        
        this.name = "1758";
        
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
	}
    
    public login(): Q.Promise<any> {
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

        hlmy.setShareInfo();
        
        window['onShareTimeline'] = function(){
            self.resolve();
        }
        
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
                    if (parseInt(application.customer.channel_data) == 0){
                        window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5MjQyOTg3MA==&mid=207867528&idx=1&sn=19c7b9";
                    } else {
                        self.resolve();
                    }
                }
            } else {
                self.reject("内部错误");
            }
        })

        return self.promise();
    }
}
