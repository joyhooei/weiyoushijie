module application {
    export var main: Main;
    export var dao: Dao;
    
    export var customer: any;
    export var bid: any;
    export var earnedGold: number = 0;
    
    export var projects: Project[];
	
	export var baseUrl: string;
	
	export var units: any[];
	
	export var blockUI: BlockUI;
    
    export var guideUI: GuideUI;
    
    export var ticks: number = 0;
    export var stopwatch: egret.EventDispatcher;

    export function init(main:Main) {
		application.main = main;
		
        application.baseUrl = "http://weiyugame.leanapp.cn/";
		//application.baseUrl = "http://localhost:3000/";
		
        application.dao = new Dao(application.baseUrl + "api/", "headline");
        
        application.projects = Project.createAllProjects();
        for(var i = 0; i < application.projects.length; i++) {
            console.log(JSON.stringify(application.projects[i]));
        }
        
        application.stopwatch = new egret.EventDispatcher();
		
        application.units = [
                'k', 'm', 'b', 't', 
                'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
                'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', 'II', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
            ];
    }
	
    export function login(data?:string|nest.user.LoginCallbackInfo):void {
        if (data == null || typeof data == "string") {
            var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
            nest.user.login(loginInfo, application.onLoginCallback);
        } else {
            application.onLoginCallback(<nest.user.LoginCallbackInfo>data);
        }
    }

    export function onLoginCallback(data:nest.user.LoginCallbackInfo):void{
        //从后台获取用户信息
        application.dao.rest("login", {token: data.token}, (succeed: boolean, customer: any) => {
            if (succeed) {
                application.customer = customer;
                
                //首次登录，需要显示引导页面
                if (application.customer.gold == 0) {
                    application.guideUI = new GuideUI();
                }
                
                //检查是否ticket超期了
                if (application.customer.vip == 1) {
                    var dt  = new Date(application.customer.ticket);
                    var now = new Date();
                    if (dt.getTime() < now.getTime()) {
                        application.customer.ticket = "";
                        application.customer.vip = 0;
                    }
                }
                
                var timer: egret.Timer = new egret.Timer(1000, 0);
				timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
                    application.ticks++;
					
                    application.stopwatch.dispatchEventWith("second", true, application.ticks);
                    
                    if (application.ticks % 60 == 0) {
                        application.stopwatch.dispatchEventWith("miniute", true, application.ticks / 60);
                        
                    	if (application.ticks % 3600 == 0) {
                        	application.stopwatch.dispatchEventWith("hour", true, application.ticks / 3600);
                    	}
                    }
				},this);
                timer.start();
                
				application.refreshBid(function(bid){
                    application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                });
            } else {
                Toast.launch("获取账号信息失败");
            }
        });
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
				}
				
				application.dao.saveCustomer();
			}
		});
    }

    export function saveCustomer() {
        application.customer.gold = Math.max(0,application.customer.gold);
        application.customer.diamond = Math.max(0,application.customer.diamond);
        application.dao.save("Customer",application.customer);
    }
    
    export function earnOfflineGold() {
        if (application.customer.offline_gold > 0) {
            application.earnGold(application.customer.offline_gold);
        }
    }
    
    export function earnGold(gold:number) {
		//处理大数 + 小数，小数被四舍五入的问题
        application.earnedGold += gold;
        
        var oldGold = application.customer.gold;
        
		application.customer.gold += application.earnedGold;
        if (oldGold != application.customer.gold) {
			application.earnedGold = 0;
			
			application.customer.accumulated_gold += application.earnedGold;
        }
        
        application.saveCustomer();
    }
    
    export function useGold(gold:number) {
        if (application.earnedGold > gold) {
            application.earnedGold -= gold;
        } else {
            application.customer.gold = application.customer.gold + application.earnedGold - gold;
            application.earnedGold = 0;
        }
        
        application.saveCustomer();
    }
    
    export function usableGold() {
        if (application.bid) {
            return Math.max(0, application.customer.gold - application.bid.gold + application.earnedGold);
        } else {
            return Math.max(0, application.customer.gold + application.earnedGold);
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
    
    export function buy(product: string, gid: string, price: number, title: string, cb:Function) {
        var order = { customer_id: application.customer.id, product: product, price: price, state: 0};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				nest.iap.pay({ goodsId: gid, goodsNumber: "1", serverId: "1",ext: o.id }, function(data) {
					if(data.result == 0) {
					} else if(data.result == -1) {
						//支付取消
                        o.reason = "用户取消了支付";
						application.dao.save("Order", o);
					} else {
						//支付失败
                        o.reason = JSON.stringify(data);
						application.dao.save("Order", o);
						
						Toast.launch("支付失败");
					}
				})
                
				application.delay(function(){
					application.checkOrderPayed(o, 10);
				}, 1000);
            } else {
                Toast.launch("保存订单失败，请稍后再试");
            }
        });
    }
    
    export function checkOrderPayed(order: any, timeout: number) {
		application.dao.fetch("Order", {id: order.id, state: 1}, {}, function(succeed, orders) {
			if (succeed && orders.length > 0) {
				//支付成功
				Toast.launch("支付成功");

				if (cb) {
					cb(orders[0]);
				}
			} else {
				// fetch again
				timeout -= 1;
				if (timeout > 0) {
					application.delay(function(){
						application.checkOrderPayed(order, timeout);
					}, 1000);
				} else {
					 Toast.launch("支付超时，请稍后再试");
				}
			}
		}};    
    }
    
    export function charge(): void {
        application.buy("Diamond", "diamond", 2, "充值", function(order){
            application.customer.diamond += 200;
            application.saveCustomer();
        }); 
    }
    
    export function buyTicket(): void {
        application.dao.fetch("Order", {customer_id: application.customer.id, "product": "Ticket", state: 1}, {}, function(succeed, orders){
			if (succeed && orders.length > 1) {
				var metal = 0;
			} else {
				var metal = 1;
			}
			
			application.buy("Ticket", "ticket", 19, "购买月票", function(order){
                var dt = new Date();
				dt = new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 30);
				application.customer.ticket = dt.toString();    
                application.customer.vip = 1;
				application.customer.metal += metal;
				application.saveCustomer();
			});
		});
    }
    
    export function buyVIP(): void {
        application.dao.fetch("Order", {customer_id: application.customer.id, "product": "Ticket", state: 1}, {}, function(succeed, orders){
			if (succeed && orders.length > 1) {
				var metal = 2;
			} else {
				var metal = 3;
			}
			
			application.buy("VIP", "vip", 49, "购买终身VIP", function(order){
                application.customer.ticket = "";
                application.customer.vip = 2;
				application.customer.metal += metal;
				application.saveCustomer();
			});
		});			
    }
    
    export function share(callback:Function): void {
        nest.share.isSupport({}, function (data) {
			if (data.share == 1) {
				var url     = application.baseUrl + "headline/index.html";
				var img_url = application.baseUrl + "headline/resource/art/home/icon.png";
				nest.share.share({ title: '我来上头条，女神任我挑！',description: '最炫最浪的舞蹈经营类游戏，无需下载，点开即送，多重豪礼等你来拿！',url: url, img_url: img_url,img_title:'头条关注'}, function (data) {
					if(data.result == 0) {
						callback();
					} else if(data.result == -1) {
						Toast.launch("取消了分享");
					} else {
						Toast.launch("分享失败");
					}
				})
			} else {
				Toast.launch("当前平台不支持分享");
			}
		});
    }
    
    export function attention(callback:Function): void {
        nest.app.isSupport({}, function (data) {
			if (data.attention == 1) {
                nest.app.attention({}, function (data) {
					if(data.result == 0) {
						callback();
					} else if(data.result == -1) {
						Toast.launch("取消了关注");
					} else {
						Toast.launch("关注失败");
					}
				})
			} else {
				Toast.launch("当前平台不支持关注");
			}
		});
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
            content =  "微信帮助平台 Amazing微遇游戏\n"
            content += "QQ客服 3369182016\n"
            content += "邮箱 3369182016@qq.com\n";
            content += "玩法\n"
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
				return d.toString();
			}
        
			let unit:string  = "";		
			for (var i = 0; i < application.units.length; i++) {
				if (d < 10) {
					return d.toFixed(2) + unit;
				} else if (d < 100) {
					return d.toFixed(1) + unit;
				} else if (d < 1000) {
						return d.toFixed() + unit;
				} else {
					unit = application.units[i];
					d = d / 1000;
				}
			}
			
			return d.toFixed() + unit;
		} catch (error) {
			console.error("format " + d.toString() + " error " + error.message);
			
			return "0";
		}
    }
    
    export function log10(d:number):number {
        let result:number = 0;
        
        while(d >= 10) {
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