module application {
    export var main: Main;
    
    export var dao: Dao;
    
    export var channel: Channel;
    
    export var me: Customer;

    export var projects: Project[];
	
	export var baseUrl: string;

	export var blockUI: BlockUI;
    
    export var guideUI: GuideUI;
    
    export var ticks: number = 0;
    export var stopwatch: egret.EventDispatcher;
    
    export var version: string = '2.2.1';
    
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
        
        application.projects = Project.createAll();
        
        application.stopwatch = new egret.EventDispatcher();
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
        
        window.onunload = function() {
            if (application.me) {
                application.me.saveNow();
            }
        }
    }
	
    export function logined(account:any):void {
		application.token = account.token;

        application.dao.fetch("Customer",{ id: account.customer_id },{ limit: 1 }).then(function(customers) {
            if(customers.length > 0) {
                application.me = new Customer(customers[0]);

                //首次登录，需要显示引导页面
                if(application.me.attrs.metal == 0) {
                    application.guideUI = new GuideUI();
                }
                
                application.me.bid.refresh(application.me).then(function(attrs){
                	application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                })
            } else {
                Toast.launch("获取账号信息失败,请重新进入");
            }
        })
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
}
