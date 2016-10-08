class BattleUI extends AbstractUI {
	public lblLives: eui.Label;
	public lblGolds: eui.Label;
	public lblWaves: eui.Label;
	
    public grpSystemTools: eui.Group;
    public grpBoughtTools: eui.Group;
    
    public grpBattle: eui.Group;

    public imgBack:  eui.Image;
    public imgStart: eui.Image;
    public imgHelp: eui.Image;
    
    private _music: egret.Sound;
    private _channel: egret.SoundChannel;

    private _running: boolean;
    
    constructor() {
        super("battleUISkin");
        
        let self = this;
        
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;

        self.grpSystemTools.addChild(new BattleSystemToolItem({category: 'soldier', image: 'tool_soldier_png'}));
        self.grpSystemTools.addChild(new BattleSystemToolItem({category: 'fireball', image: 'tool_fireball_png'}));
        
        application.dao.fetch("Tool", {customer_id: application.me.attrs.id, count: {$gt: 0}}).then(function(tools){
            for(let i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        })
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            self.lblLives.text = application.battle.getLives().toString();
            self.lblGolds.text = application.battle.getGolds().toString();
            self.lblWaves.text = application.battle.getWaves().toString();
        }, self);
        
		self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    self._quitBattle();
		}, self);
        
		self.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    HelpUI.showMainHelp();
		}, self);
		
		self.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			self.stage.frameRate = application.frameRate;
			self.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame, this);

            self.imgStart.visible = false;
		}, self);
    }

    protected onRefresh() {
        this.grpBattle.addChild(application.battle);
		
		this._startBattle();
    }
    
    private _startBattle() {
    	//this._channel = this._music.play(0, 0);

        this._running = true;
    	
        application.battle.start();
	}

    private _onEnterFrame(e:egret.Event) {
        if (application.battle.update()) {
    		let self = this;

            if (self._running) {
                self._running = false;

                if (self._channel) {
                    self._channel.stop();
                }
 					
				self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
           
                application.showUI(new BattleOptionUI(function(){
					application.battle = <Battle>application.pool.get(application.battle.getClaz());
					self._startBattle();
                }, function(){
					if (application.battle) {
						application.battle.erase();
						application.battle = null;
					}

					application.hideUI(self);
                }));
            }
        } else {
        	application.battle.paint();
        }
    }
}
