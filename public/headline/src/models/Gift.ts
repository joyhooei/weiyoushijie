enum GiftCategory {
    Login = 1,
    Online,
    Bid,
    Ticket,
	Share,
	Charge,
	Output,
	Attention
}

class Gift {
    public static notify() {
        application.dao.dispatchEventWith("Gift", true, null);
    }
    
    public static check(customer) {
        return Q.Promise(function(resolve, reject, notify) {
            application.dao.fetch("Gift", {customer_id: customer.me.id}, {order : 'category ASC'}).then(function(gifts){
                if (gifts.length > 0) {
    				//如果到了第二天，将所有已经领取礼物重新修改为可以领取
    				var day = 1000 * 60 * 60 * 24;
    				
                    var now = new Date();
                    var nowaday = now.getDate();
    					
    				var hasGift = false;
                    
    				for(var i = 0; i < gifts.length; i++) {
    					var gift = gifts[i];
    
                        //可以领取的不要更新
                        if(gift.locked == 0) {
                            hasGift = true;
                            continue;
                        }
    					
    					if (gift.last_pick_day) {
                            var lastPickDay = (new Date(gift.last_pick_day)).getDate();
                        } else {
                            var dt = new Date();
                            dt.setTime(now.getTime() - day);
                            var lastPickDay = dt.getDate();
                        }
    					
    					//首充奖励只有一次
                        //关注只有一次
                        //今天已经领取过了
                        if(gift.category == GiftCategory.Charge || gift.category == GiftCategory.Attention || nowaday == lastPickDay) {
                            continue;
                        }
    
                        if (gift.category == GiftCategory.Online) {
    						//在线已经过了一小时，可以领取了
    			            var lastLogin = new Date(customer.me.last_login);
    			            var diff      = Math.floor((now.getTime() - lastLogin.getTime()) / 1000);
    			            if(diff >= 3600) {
    				            gift.locked = 0;
    							
    							hasGift = true;
                            } else {
                                gift.data = (3600 - diff).toString();
    							gift.locked = 1;
    						}
                        } else if (gift.category == GiftCategory.Ticket) {						
                            customer.checkTicket();
                            
    						if (customer.me.vip > 0) {
    							gift.locked = 0;
    							
    							hasGift = true;
    						} else {
    							gift.locked = 1;
    						}
                        } else if (gift.category == GiftCategory.Output) {
    						let nextOutput:number = +gift.data;
    						let nextOutputLog: number = Utility.log10(nextOutput);
                            let outputLog: number = Utility.log10(customer.me.output);
                            
    						//如果用户的秒产超过了下一个可以领取的秒产，则解锁
    						if (outputLog >= nextOutputLog) {
    							gift.locked = 0;
    						}                     
                        } else {                    
                            gift.locked = 1;
                        }
    				}
                    
                    resolve(gifts, hasGift);
                } else {
                    reject('没有礼物');
                }
            }, function(error){
                reject(error);
            });
        });
    }
}
