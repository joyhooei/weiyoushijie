module application {
    export var main: Main;
    export var dao: Dao;
    
    export var channel: Channel;
    
	export var saveSeconds: number = 0;
    export var customer: any;
    
    export var bid: any;
    
    export var projects: Project[];
	
	export var baseUrl: string;
	
	export var units: any[];
	
	export var blockUI: BlockUI;
    
    export var guideUI: GuideUI;
    
    export var ticks: number = 0;
    export var stopwatch: egret.EventDispatcher;
    
    export var vip: Vip;
    
    export var version: string = '1.6.1';
    
    export var token: string = "";

    export function init(main:Main) {
		application.main = main;
		
        var url = egret.getOption("wysj_server");
        if (url && url.length > 1) {
            application.baseUrl = url;
        } else {
            application.baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/";
		}
		
        application.dao = new Dao(application.baseUrl + "api/", "headline");
        
        application.channel = Channel.create();
        
        application.projects = Project.createAllProjects();
        
        application.stopwatch = new egret.EventDispatcher();
		
        application.units = [
                'k', 'm', 'b', 't', 
                'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
                'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', 'II', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
            ];
            
        window.onunload = function() {
            if (application.customer) {
                application.saveCustomerNow();
            }
        }
    }
	
    export function logined(account:any):void {
		application.token = account.token;

        application.dao.fetch("Customer",{ id: account.customer_id },{ limit: 1 },function(succeed,customers) {
            if(succeed && customers.length > 0) {
                var customer = customers[0];
                application.customer = customer;

                application.vip = Vip.createVip(application.customer.charge);

                application.checkTicket();

                application.channel.track(TRACK_CATEGORY_PLAYER, TRACK_ACTION_ENTER); 

                //首次登录，需要显示引导页面
                if(application.customer.metal == 0) {
                    application.guideUI = new GuideUI();
                }

                if(!application.customer.earned_gold) {
                    application.customer.earned_gold = 0;
                }

                var timer: egret.Timer = new egret.Timer(1000,0);
                timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
                    application.ticks++;

                    application.stopwatch.dispatchEventWith("second",true,application.ticks);

                    if(application.ticks % 60 == 0) {
                        application.stopwatch.dispatchEventWith("minute",true,application.ticks / 60);

                        if(application.ticks % 3600 == 0) {
                            application.stopwatch.dispatchEventWith("hour",true,application.ticks / 3600);
                        }
                    }
                },this);
                timer.start();

                application.refreshBid(function(bid) {
                    application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                });
            } else {
                Toast.launch("获取账号信息失败");
            }
        })
    }
	
	export function resetTicket(vip: number): void {
		application.customer.vip = vip;
		
		if (vip == 0 || vip == 2) {
			application.customer.ticket = "";
		} else {
			var now = new Date();
			now = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
			application.customer.ticket = now.toString();
		}
		
		application.saveCustomerNow();
	} 
    
    export function checkGift(cb: Function) {
        application.dao.fetch("Gift", {customer_id: application.customer.id}, {order : 'category ASC'}, function(succeed, gifts){
            if (succeed && gifts.length > 0) {
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
			            var lastLogin = new Date(application.customer.last_login);
			            var diff      = Math.floor((now.getTime() - lastLogin.getTime()) / 1000);
			            if(diff >= 3600) {
				            gift.locked = 0;
							
							hasGift = true;
                        } else {
                            gift.data = (3600 - diff).toString();
							gift.locked = 1;
						}
                    } else if (gift.category == GiftCategory.Ticket) {						
                        application.checkTicket();
                        
						if (application.customer.vip > 0) {
							gift.locked = 0;
							
							hasGift = true;
						} else {
							gift.locked = 1;
						}
                    } else if (gift.category == GiftCategory.Output) {
						let nextOutput:number = +gift.data;
						let nextOutputLog: number = application.log10(nextOutput);
                        let outputLog: number = application.log10(application.customer.output);
                        
						//如果用户的秒产超过了下一个可以领取的秒产，则解锁
						if (outputLog >= nextOutputLog) {
							gift.locked = 0;
						}                     
                    } else {                    
                        gift.locked = 1;
                    }
				}
                
                cb(gifts, hasGift);
            }
        });
    }
    
    //检查是否ticket超期了
    export function checkTicket(): void {
        if(application.customer.vip == 1) {
            if(application.customer.ticket && application.customer.ticket.length > 1) {
                var ticketTimeout = new Date(application.customer.ticket);
                var now = new Date();
                if(ticketTimeout.getTime() < now.getTime()) {
                    application.resetTicket(0);
                }
            } else {
                application.resetTicket(1);
            }
        }
        
    }
	
	export function delay(cb: Function, miniseconds: number) {
		var timer: egret.Timer = new egret.Timer(miniseconds, 1);
		timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
			cb();
		},this);
		timer.start();	
	}
    
    export function bidDay(): string {
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    
    export function refreshBid(cb: Function): void {
        application.dao.fetch("Bid",{ succeed: 0, day :application.bidDay(), customer_id: application.customer.id}, {limit : 1}, function(succeed, bids){
            if (succeed && bids.length > 0) {
                application.bid = bids[0];				
            } else {
                application.bid = null;
            }

            cb(application.bid);
        })
    }
    
    export function earnBids(): void {
		application.dao.fetch("Bid", {customer_id: application.customer.id, succeed: 1, claimed: 0}, {}, function(succeed, bids){
			if (succeed && bids.length > 0) {
				for(var i = 0; i < bids.length; i++) {
					application.customer.gold -= bids[i].gold;
					application.customer.metal++;
					application.customer.diamond += 2000;

					bids[i].claimed = 1;
					application.dao.save("Bid", bids[i]);
                    
                    application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "拍卖头名", 2000); 
				}
				
				application.saveCustomerNow();
			}
		});
    }

    export function saveCustomer() {
		var now = (new Date()).getTime() / 1000;
        if (now - application.saveSeconds >= 120) {
            application.saveCustomerNow();
		} else {
			application.dao.dispatchEventWith("Customer", true, application.customer);
		}
    }

    export function saveCustomerNow() {
        application.saveSeconds = (new Date()).getTime() / 1000;

        application.customer.version = application.version;
        application.customer.gold = Math.max(0,application.customer.gold);
        application.customer.earned_gold = Math.max(0,application.customer.earned_gold);
        application.customer.accumulated_gold = Math.max(application.customer.accumulated_gold,application.customer.gold);
        application.customer.diamond = Math.max(0,application.customer.diamond);
        application.dao.save("Customer",application.customer, function(succeed, customer){
            if (application.customer.charge != application.vip) {
                application.vip = Vip.createVip(application.customer.charge);
            }
        });
    }
    
    export function giftChanged() {
        application.dao.dispatchEventWith("Gift", true, null);
    }
    
    export function earnOfflineGold() {
        if (application.customer.offline_gold > 0) {
            application.earnGold(application.customer.offline_gold);
            application.saveCustomerNow();
        }
    }
    
    export function earnGold(gold:number) {
		//处理大数 + 小数，小数被四舍五入的问题
        application.customer.earned_gold += gold;
        
        var oldGold = application.customer.gold;
        
        application.customer.gold += application.customer.earned_gold;
        if (oldGold != application.customer.gold) {
            application.customer.accumulated_gold += application.customer.earned_gold;
            
            application.customer.earned_gold = 0;			
        }
        
        application.saveCustomer();
    }
    
    export function useGold(gold:number) {
        if(application.customer.earned_gold > gold) {
            application.customer.earned_gold -= gold;
        } else {
            application.customer.gold = application.customer.gold + application.customer.earned_gold - gold;
            application.customer.earned_gold = 0;
        }
        
        application.saveCustomerNow();
    }
    
    export function usableGold() {
        if (application.bid) {
            return Math.max(0,application.customer.gold - application.bid.gold + application.customer.earned_gold);
        } else {
            return Math.max(0,application.customer.gold + application.customer.earned_gold);
        }
    }

    export function buyOutput(gold:number, diamond: number, output:number): void {
        gold    = Math.abs(gold);
        diamond = Math.abs(diamond);
        output  = Math.abs(output);
        
        application.customer.diamond -= diamond;	
        application.customer.output  += output;
        application.useGold(gold);
        
        if (application.customer.output >= 100) {
			if(application.log10(application.customer.output) > application.log10(application.customer.output - output)) {
				application.dao.fetch("Gift", {customer_id: application.customer.id, category: 7}, {limit: 1}, function(succeed, gifts){
					if (succeed && gifts.length > 0) {
						var gift = gifts[0];
						gift.locked = 0;
						application.dao.save("Gift", gift);
					}
				});
			}
		}
    }
    
    export function buy(product: string, gid: string, price: number) {
        var firstCharge = application.customer.charge == 0;
        
        var order = { customer_id: application.customer.id, product: product, price: price, state: 0};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
                application.channel.pay({ goodsId: gid, goodsName: gid, goodsNumber: "1", money: price, orderId: o.id }).then(function(data){
                }, function(error){
                    Toast.launch(error);
                });
                    
                application.checkOrderPayed(o, 20, firstCharge);
            } else {
                Toast.launch("保存订单失败，请稍后再试");
            }
        });
    }
    
    export function checkOrderPayed(order: any, times: number, firstCharge:boolean) {
		application.delay(function(){
			application.dao.fetch("Order", {id: order.id, state: 1}, {}, function(succeed, orders) {
				if (succeed && orders.length > 0) {
					var o = orders[0];
                    
					if (o.product == "Diamond") {
                        var diamond = 400;
                        if (o.price == 5) {
                            diamond = 1200;
                        } else if (o.price == 10) {
                            diamond = 2600;
                        } else if (o.price == 30) {
                            diamond = 9000;
                        } else if (o.price == 100) {
                            diamond = 36000;
                        } else if (o.price == 500) {
                            diamond = 200000;
                        }

						application.customer.diamond += diamond;
						application.saveCustomerNow();             
                        
                        if (firstCharge) {
						    Toast.launch("购买了" + diamond.toString() + "钻石,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                            application.giftChanged();
                        } else {
                            Toast.launch("购买了" + diamond.toString() + "钻石");
                        }
					} else {
						application.dao.fetch("Order", {customer_id: application.customer.id, "product": "Ticket", state: 1}, {}, function(succeed, os){
							if (o.product == "Ticket") {
								//已经买过月票，不能再获取奖章了
								if (succeed && os.length >= 2) {
									var metal = 0;
								} else {
									var metal = 1;
								}

                                application.customer.diamond += 2000;
								application.customer.metal += metal;
                                application.resetTicket(1);
                                 
								if (firstCharge) {
									Toast.launch("购买了月票,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                                    application.giftChanged();
								} else {
									Toast.launch("购买了月票");
								}
							} else {
								//已经买过月票，只能再获取2个奖章
								if (succeed && os.length >= 1) {
									var metal = 2;
								} else {
									var metal = 3;
								}

                                application.customer.diamond += 5000;
								application.customer.metal += metal;
                                application.resetTicket(2);
                                
								if (firstCharge) {
									Toast.launch("购买了VIP,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                                    application.giftChanged();
								} else {
									Toast.launch("购买了VIP");
								}
							}
						});
					}
				} else {
					// fetch again
					times -= 1;
					if (times > 0) {
						application.checkOrderPayed(order, times, firstCharge);
					} else {
						 Toast.launch("支付超时，请稍后再试");
					}
				}
			}); 
		}, 1000);
    }
    
    export function charge(gid:string, diamond: number): void {
        application.buy("Diamond", gid, diamond); 
    }
    
    export function buyTicket(): void {
       	application.buy("Ticket", "ticket", 19);
    }
    
    export function buyVIP(): void {
        application.buy("VIP", "vip", 49);			
    }

    export function gotoHome(): void {
        application.main.homeUI.gotoPage(GamePages.HOME,true);
    }
    
    export function gotoAuction(): void {
        application.main.homeUI.gotoPage(GamePages.AUCTION, false);
    }
    
    export function gotoTool(): void {
        application.main.homeUI.gotoPage(GamePages.TOOL, false);
    }
    
    export function showHelp(content:string): egret.DisplayObjectContainer {
        if (content.length == 0) {
            content = "玩法\n"
            content += "1. 点击中间舞者可产生金币，金币用来升级运营项目，而运营项目随等级提高从而产生更多的金币。\n"
            content += "2. 金币可以用来参加头条拍卖，每天最高出价者会成为头条，获得头条殊荣，勋章和钻石奖励。\n"
            content += "3. 道具可以帮助玩家快速获得大量金币和永久提高运营项目的每秒产量。\n"
            content += "4. 排行榜会按照勋章的个数排名，勋章数量一致时则按照金币的总量排名。\n"
			
            var blankWidth = Math.round(egret.sys.measureText(" ",'Arial',24,false,false));
            var maxWidth = Math.round(egret.sys.measureText("276个0          zz",'Arial',24,false,false));
			
			var lines = [];
			lines.push("金币单位");
			for (var i = 0; i < application.units.length; i++) {
                var line  = ((i + 1) * 3).toString() + "个0";
				
				var blanks = Math.round((maxWidth - egret.sys.measureText(line + application.units[i], 'Arial', 24, false, false))/ blankWidth);
				for(var j = 0; j < blanks; j++) {
					line += " ";
				}
				
				lines.push(line + application.units[i]);
			}
			
			var leftBlanks = Math.floor((380 - maxWidth) / (blankWidth * 2));
			var leftBlank = "";
			for(var j = 0; j < leftBlanks; j++) {
				leftBlank += " ";
			}
			
			for (var i = 0; i < lines.length; i++) {
				content += leftBlank + lines[i] + "\n";
			}
        }
		
        return application.showUI(new HelpUI(content));
    }
    
    export function showUI(ui: eui.Component,parent?: egret.DisplayObjectContainer): egret.DisplayObjectContainer {
        ui.horizontalCenter = 0;
        ui.verticalCenter   = 0;
        
        if (!application.blockUI) {
            application.blockUI = new BlockUI();
        }
        
        application.blockUI.addChild(ui);
        
        if (application.guideUI) {
			if (parent) {
				if (parent.contains(application.guideUI)) {
					parent.addChildAt(application.blockUI, parent.getChildIndex(application.guideUI));
				} else {
					parent.addChild(application.blockUI); 
				}
			} else {
				application.main.homeUI.addChildAt(application.blockUI, parent.getChildIndex(application.guideUI));
			}
        } else {
			if (parent) {
				parent.addChild(application.blockUI); 
			} else {
				application.main.homeUI.addChild(application.blockUI);
			}
		}
        
        return ui;
    }
    
    export function hideUI(ui: eui.Component): egret.DisplayObjectContainer {
        if (ui && ui.parent) {
            if(ui.parent == application.blockUI) {
                if (application.blockUI.numChildren <= 2) {
					if (ui.parent.parent) {
						ui.parent.parent.removeChild(application.blockUI);
					}
				}
                
                application.blockUI.removeChild(ui);
            } else {
                ui.parent.removeChild(ui);
            }
        }
        
        return ui;
    }
   
    export function format(d:number): string {
		try {
			if (d <= 99999) {
				return new Number(d).toFixed();
			}
        
			let unit:string  = "";		
			for (var i = 0; i < application.units.length; i++) {
				if (d < 10) {
                    return new Number(d).toFixed(2) + unit;
				} else if (d < 100) {
                    return new Number(d).toFixed(1) + unit;
				} else if (d < 1000) {
                    return new Number(d).toFixed() + unit;
				} else {
					unit = application.units[i];
					d = d / 1000;
				}
			}
			
            return new Number(d).toFixed() + unit;
		} catch (error) {
            console.error("format " + d + " error " + error.message);
			
			return "0";
		}
    }
    
    export function log10(d:number):number {
        let result:number = 0;
        
        //可能出现9.9999999e+25的情况
        while(d >= 9) {
            result += 1;
            d = d / 10;
        }
        
        return result;
    }
	
	export function avatarUrl(customer: any): string {
		if (customer.avatar && customer.avatar.length > 1) {
			return customer.avatar;
		} else {
            var url = application.baseUrl + "headline/resource/art/";
			if (customer.sex == 1) {
				return url + "headM.png";
			} else if (customer.sex == 2) {
				return url + "headF.png";
			} else {
                return url + "head.png";
            }
		}
	}
}