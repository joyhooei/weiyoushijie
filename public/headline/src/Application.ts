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
    
    export var version: string = '1.6.2';
    
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
                'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', '!', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
                'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', '!!', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
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

    export function usableGold() {
        if (application.bid) {
            return Math.max(0,application.customer.gold - application.bid.gold + application.customer.earned_gold);
        } else {
            return Math.max(0,application.customer.gold + application.customer.earned_gold);
        }
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
