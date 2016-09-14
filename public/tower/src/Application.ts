module application {
    export var main: Main;
    
    export var dao: Dao;
    
    export var channel: Channel;
    
    export var me: Customer;
    
    export var legends: Legend[] = [];

    export var battle: Battle;
    
    export var frameRate: number = 36;
    
    export var characters: Character[];
    
    export var pool: EntityPool;
	
	export var baseUrl: string;

	export var blockUI: BlockUI;
    
    export var guideUI: GuideUI;
    
    export var ticks: number = 0;
    export var stopwatch: egret.EventDispatcher;
    
    export var version: string = '1.1.1';
    
    export var game: string = 'tower';
    
    export var token: string = "";

    export var development: number = 0;

    export function init(main:Main) {
		application.main = main;

        if (egret.getOption("wysj_development")) {
            application.development = 1;
        }
		
        var url = egret.getOption("wysj_server");
        if (url && url.length > 1) {
            application.baseUrl = url;
        } else {
            application.baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/";
		}
		
        /*
		let logger = log4javascript.getLogger("larksoft");
		let appender = new log4javascript.AjaxAppender(application.baseUrl + "logs");
		appender.setWaitForResponse(false);
		appender.setThreshold(log4javascript.Level.ERROR);
		let layout = new log4javascript.HttpPostDataLayout();
		layout.setCustomField("version", application.version);
		layout.setCustomField("game", application.game);
		appender.setLayout(layout);
		logger.addAppender(appender);
		Utility.takeOverConsole(logger);
        */
		
        application.dao = new Dao(application.baseUrl + "api/");
        
        application.channel = Channel.create();
        
        application.characters = Character.createAll();
        
        application.pool = new EntityPool();

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
                application.channel.track(TRACK_CATEGORY_PLAYER,TRACK_ACTION_ENTER);
                
                application.legends = [];
                application.dao.fetch("Legend", {customer_id: account.customer_id}).then(function(legends) {
                	for(let i = 0; i < legends.length; i++) {
                		application.legends.push(new Legend(legends[i]));
                	}
                	
                	application.dao.fetch("Skill", {customer_id: account.customer_id}).then(function(skills) {
	                	for(let i = 0; i < skills.length; i++) {
	                		for (let j = 0; j < application.legends.length; j++) {
	                			if (application.legends[j].attrs.id == skills[i].legend_id) {
	                				application.legends[j].addSkill(skills[i]);
	                			}
	                		}
	                	}
                	})
                });
                
                //首次登录，需要显示引导页面
                if(application.me.attrs.metal == 0) {
                    application.guideUI = new GuideUI();
                }
            } else {
                Toast.launch("获取账号信息失败,请重新进入");
            }
        })
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
