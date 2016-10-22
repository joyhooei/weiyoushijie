class BattleUI extends AbstractUI {
    public lblLives: eui.Label;
    public lblGolds: eui.Label;
    public lblWaves: eui.Label;
	public lblTotalWaves: eui.Label;
	
    public grpSystemTools: eui.Group;
	public grpTools:eui.Group;
    public grpBoughtTools: eui.Group;
    
    public grpBattle: eui.Group;

	private _svBattle: egret.ScrollView;

	public grpHeader: eui.Group;

    public imgBack:  eui.Image;
    public imgStart: eui.Image;
    public imgHelp:  eui.Image;
	public imgTool:  eui.Image;
    
    private _music: egret.Sound;
    private _channel: egret.SoundChannel;

    private _running: boolean;
    
    constructor() {
        super("battleUISkin");
        
        let self = this;
        
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;

		self.grpHeader.touchEnabled = false;
        
        application.dao.fetch("Tool", {customer_id: application.me.attrs.id}).then(function(tools){
			let toolCategories = ["thunder", "freeze", "nectar", "mammon"];
			for(let i = 0; i < toolCategories.length; i++) {
				let tool:any = null;
				for(let j = 0; j < tools.length; j++) {
					if (tools[j].category == toolCategories[i]) {
						tool = tools[j];
						tool.count = tool.count || 0;
					}
				}
				
				if (null == tool) {
					tool = {category: toolCategories[i], count: 1, customer_id: application.me.attrs.id};
				}
				
				self.grpBoughtTools.addChild(new BattleToolItem(tool));
			}
        })
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
			if (parseInt(self.lblGolds.text) != application.battle.getGolds()) {
				self._animateStep(self.lblGolds, parseInt(self.lblGolds.text), application.battle.getGolds());
			}
			
			self.lblLives.text = application.battle.getLives().toString();
			self.lblWaves.text = application.battle.getCurrentWave().toString();
        }, self);

		self.imgTool.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			self.grpTools.visible = !self.grpTools.visible; 
		}, self);
        
		self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    self._overBattle();
		}, self);
        
		self.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    HelpUI.showMainHelp();
		}, self);
		
		self.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			application.battle.fight();

			self.imgTool.visible = true;
			self.grpSystemTools.visible = true;
            self.imgStart.visible = false;
		}, self);
    }

    protected onRefresh() {      
		this.grpSystemTools.visible = false;
        this.grpSystemTools.addChild(new BattleSystemToolItem({category: 'soldier', count: 1}));
        this.grpSystemTools.addChild(new BattleSystemToolItem({category: 'fireball', count: 1}));

	    this._svBattle = new egret.ScrollView();
        //设置滚动区域宽高
        this._svBattle.width  = this.width;
        this._svBattle.height = this.height;
		this._svBattle.bounces = false;
        this.grpBattle.addChild(this._svBattle);
		
		this._buildBattle();
    }

	private _animateStep(lbl:eui.Label, from:number, to:number): void {
		if (from == to) {
			return;
		}
		
		let step:number = Math.min(Math.abs(from - to), 20);
		var delta = (to - from) / step;
		var timer: egret.Timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			lbl.text = Math.round(from + delta * (<egret.Timer>event.target).currentCount).toString();
		}, this);
		
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
			lbl.text = to.toString();
		}, this);

        timer.start();
	}
    
    private _buildBattle() {
		application.battle.setUI(this);
		
		//this._channel = this._music.play(0, 0);

		this.imgStart.visible = true;
		this.grpTools.visible = false;
		this.imgTool.visible  = false;
		this.grpSystemTools.visible = false;
		this.grpHeader.visible = true;
		
        this._running = true;
		
		this.lblLives.text = "0";
		this.lblGolds.text = "0";
		this.lblWaves.text = "0";
 		this.lblTotalWaves.text = application.battle.getTotalWaves().toString();

		this._svBattle.setContent(application.battle);
        application.battle.build();
		
		//this.stage.frameRate = application.frameRate;
		this.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame, this);
	}

	private _overBattle() {
		let self = this;

		self.imgStart.visible = false;
		self.grpTools.visible = false;
		self.imgTool.visible  = false;
		self.grpSystemTools.visible = false;
		self.grpHeader.visible = false;

		if (self._running) {
			self._running = false;

			if (self._channel) {
				self._channel.stop();
			}

			self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);

			application.showUI(new BattleOptionUI(function(){
				self._eraseBattle();

				application.battle = <Battle>application.pool.get(application.battle.getClaz());
				self._buildBattle();
			}, function(){
				self._eraseBattle();

				self.hide();
			}));
		}
	}

	private _eraseBattle() {
		if (application.battle) {
			application.battle.erase();
			this._svBattle.removeContent();
			application.pool.set(application.battle);
			application.battle = null;
		}
	}

    private _onEnterFrame(e:egret.Event) {
        if (application.battle.update()) {
    		this._overBattle();
        } else {
        	application.battle.paint();
        }
    }
}
