module application {
    export var main: Main;
    export var dao: Dao;
    
    export var customer: any;
    export var bid: any;
    
    export var projects: Project[];
	
	export var baseUrl: string;
	
	export var units: any[];
	
	export var blockUI: BlockUI;
    
    export var guideUI: GuideUI;

    export function init(main:Main) {
		application.main = main;
		
        application.baseUrl = "http://weiyugame.leanapp.cn/";
		//application.baseUrl = "http://localhost:3000/";
		
        application.dao = new Dao(application.baseUrl + "api/", "headline");
        
        application.projects = Project.createAllProjects();
		
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
                //首次登录，需要显示引导页面
                if (application.customer.gold == 0) {
                    application.guideUI = new GuideUI();
                }
                
                application.customer = customer;
				application.refreshBid(function(bid){
                    application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                });
            } else {
                Toast.launch("获取账号信息失败");
            }
        });
    }
    
    export function bidDay(): string {
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    
    export function ticketDay(): number {
        if (application.customer.ticket && application.customer.ticket.length > 1) {
            var ticketTimeout = new Date(application.customer.ticket);
            var now = new Date();;

            var timeDiff = ticketTimeout.getTime() - now.getTime();
            if (timeDiff < 0) {
                return 0;
            } else {
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                if (diffDays > 30) {
                    return -1;
                } else {
                    return diffDays;
                }
            }
        } else {
            return 0;
        }    
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
    
    export function refreshCustomer(goldAdded:number, diamondAdded: number, outputAdded:number, totalHitsAdded:number, projEdited:any) {
        application.main.homeUI.refresh(goldAdded,diamondAdded,outputAdded,totalHitsAdded,projEdited);
    }

    export function fetchCustomer(): void {
        application.dao.fetch("Customer", {id: application.customer.id}, {}, function(succeed, customers) {
            if (succeed && customers.length > 0) {
                application.customer = customers[0];
                
                application.refreshCustomer(application.customer.gold, application.customer.diamond, application.customer.output, application.customer.total_hits, null);
            }
        });
    }
    
    export function usableGold() {
        if (application.bid) {
            return application.customer.gold - application.bid.gold;
        } else {
            return application.customer.gold;
        }
    }

    export function buyOutput(gold:number, diamond: number, output:number, proj:any, cb: Function): void {
        gold    = Math.abs(gold);
        diamond = Math.abs(diamond);
        output  = Math.abs(output);
        
        application.customer.gold    -= gold;
        application.customer.diamond -= diamond;	
        application.customer.output  += output;
        application.refreshCustomer(0 - gold, 0 - diamond, output, 0, proj);
        
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
		
        application.dao.save("Customer", application.customer);
        
        cb(true, c);
    }
    
    export function buy(product: string, gid: string, price: number, title: string) {
        var order = { customer_id: application.customer.id, product: product, price: price, state: 0};
        application.dao.save("Order", order, function(succeed, o) {
            if (succeed) {
				nest.iap.pay({ goodsId: gid, goodsNumber: "1", serverId: "1",ext: o.id }, function(data) {
					if(data.result == 0) {
						//支付成功
						Toast.launch(title + "成功");
					} else if(data.result == -1) {
						//支付取消
    					o.state = 2;
                        o.reason = "用户取消了支付";
						application.dao.save("Order", o);
					} else {
						//支付失败
                        o.state = 3;
                        o.reason = JSON.stringify(data);
						application.dao.save("Order", o);
						
						Toast.launch("支付失败");
					}
				})
            } else {
                Toast.launch("保存订单失败，请稍后再试");
            }
        });
    }
    
    export function charge(): void {
        application.buy("Diamond", "diamond", 2, "充值");  
    }
    
    export function buyTicket(): void {
        application.buy("Ticket", "ticket", 19, "购买月票");     
    }
    
    export function buyVIP(): void {
        application.buy("VIP", "vip", 49, "购买终身VIP");      
    }
    
    export function share(callback:Function): void {
        nest.share.isSupport({}, function (data) {
			if (data.share == 1) {
				var url     = application.baseUrl + "headline/index.html";
				var img_url = application.baseUrl + "headline/resource/art/home/icon.png";
				nest.share.share({ title: '我来上头条，女神任我挑！',description: '最炫最浪的舞蹈经营类游戏，无需下载，点开即送，多重豪礼等你来拿！',url: url, img_url: img_url,img_title:'我要上头条'}, function (data) {
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
			
			var blankWidth = egret.measureTextWidth(" ");
			var maxWidth   = egret.measureTextWidth("276个0          zz");
			
			var lines = [];
			lines.push("金币单位");
			for (var i = 0; i < application.units.length; i++) {
                var line  = ((i + 1) * 3).toString() + "个0";
				
				var blanks = Math.floor((maxWidth - egret.measureTextWidth(line + application.units[i])) / blankWidth);
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
                if (ui.parent.parent) {
                    ui.parent.parent.removeChild(application.blockUI);
                }
                
                application.blockUI.removeChild(ui);
            } else {
                ui.parent.removeChild(ui);
            }
        }
        
        return ui;
    }
   
    export function format(d:number): string {
        if (d <= 99999) {
            return d.toString();
        }
        
		let unit:string  = "";
		try {
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
		} catch (error) {
			console.error("format " + d.toString() + " error " + error.message);
		}
        
        return d.toFixed() + unit;
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