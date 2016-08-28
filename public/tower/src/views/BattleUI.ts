class BattleUI extends AbstractUI {
	public lblLives: eui.Label;
	public lblGolds: eui.Label;
    public grpSystemTools: eui.Group;
    public grpBoughtTools: eui.Group;
    public grpBattle: eui.Group;

    public imgBack:  eui.Image;
    
    private _music: egret.Sound;
    
    constructor() {
        super("battleUISkin");
        
        let self = this;
        
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;

        self.grpSystemTools.addChild(new BattleSystemToolItem({category: 'soldier'}));
        self.grpSystemTools.addChild(new BattleSystemToolItem({category: 'fireball'}));
        
        application.dao.fetch("Tool", {customer_id: application.me.attrs.id, count: {$gt: 0}}).then(function(tools){
            for(let i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        })
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            self.lblLives.text = application.battle.getLives().toString();
            self.lblGolds.text = application.battle.getGolds().toString();
        }, self);
        
		self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    self._quitBattle();
		}, self);
    }

    protected onRefresh() {
        this._startBattle();
    }
    
    private _quitBattle() {
	    this.removeEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame, this);
	    
	    application.battle.erase();
	    application.battle = null;

	    application.hideUI(this);
    }
    
    private _startBattle() {
    	//this._music.play();
    	
        application.battle.start();
        
    	this.grpBattle.addChild(application.battle);
    	
    	this.stage.frameRate = application.frameRate;
    	this.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame, this);
    }
    
    private _restartBattle() {
		application.battle = <Battle>application.pool.get(application.battle.getClassName());
        this._startBattle();
    }

    private _onEnterFrame(e:egret.Event) {
        if (application.battle.update()) {
    		let self = this;

            self._music.close();
    	
    		application.showUI(new BattleOptionUI(function(){
    			self._restartBattle();
    		}, function(){
    			self._quitBattle();
    		}));        	
        } else {
        	application.battle.paint();
        }
    }
}
