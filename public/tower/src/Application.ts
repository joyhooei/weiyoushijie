module application {
    export var main: Main;
    
    export var dao: Dao;
    
    export var channel: Channel;
    
    export var me: Customer;
    
    export var skills: Skill[] = [];

    export var battle: Battle;
    
    export var frameRate: number = 36;
    
    export var characters: Character[];
    
    export var pool: EntityPool;
	
	export var baseUrl: string;
    
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
                
				application.skills = [];
				application.dao.fetch("Skill", {customer_id: account.customer_id}).then(function(skills) {
					application.skills = skills;
				})
                
                //首次登录，需要显示引导页面
                if(application.me.attrs.metal == 0) {
                    application.guideUI = new GuideUI();
                }
            } else {
                Toast.launch("获取账号信息失败,请重新进入");
            }
        })
    }

    export function showUI(ui: eui.Component,parent?: egret.DisplayObjectContainer, x?:number, y?:number): egret.DisplayObjectContainer {
        if (x && y) {
            ui.x = x - ui.width / 2;
            ui.y = y - ui.height / 2;
        } else {
            ui.horizontalCenter = 0;
            ui.verticalCenter   = 0;
        }
        
        let blockUI = new BlockUI();
        blockUI.addChild(ui);
        
        if (application.guideUI) {
			if (parent) {
				if (parent.contains(application.guideUI)) {
					parent.addChildAt(blockUI, parent.getChildIndex(application.guideUI));
				} else {
					parent.addChild(blockUI); 
				}
			} else {
				application.main.homeUI.addChildAt(blockUI, parent.getChildIndex(application.guideUI));
			}
        } else {
			if (parent) {
				parent.addChild(blockUI); 
			} else {
				application.main.homeUI.addChild(blockUI);
			}
		}
        
        return ui;
    }
    
    export function hideUI(ui: eui.Component): egret.DisplayObjectContainer {
        if (ui && ui.parent) {
            if(egret.getQualifiedClassName(ui.parent) == "BlockUI") {
                if (ui.parent.parent) {
                    ui.parent.parent.removeChild(ui.parent);
                }
                
            }

            ui.parent.removeChild(ui);
        }
        
        return ui;
    }
}
