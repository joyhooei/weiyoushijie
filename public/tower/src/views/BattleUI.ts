class BattleUI extends AbstractUI {
	public lblLives: eui.Label;
	public lblGolds: eui.Label;
    public grpSystemTools: eui.Group;
    public grpBoughtTools: eui.Group;
    public grpBattle: eui.Group;

    public imgBack:  eui.Image;
    
    constructor() {
        super("battleUISkin");
        
        let self = this;
        
    	self.grpBattle.addChild(application.battle);

        self.grpSystemTools.addChild(new BattleTimeoutToolItem({category: 'solider'}));
        self.grpSystemTools.addChild(new BattleTimeoutToolItem({category: 'fireball'}));
        
        application.dao.fetch("Tool", {customer_id: application.me.attrs.id, count: {$gt: 0}}).then(function(tools){
            for(let i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        })
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            self.lblLives.text = application.battle.getLives();
            self.lblGolds.text = application.battle.getGolds();
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
    	application.battle.initialize({});
    	
    	this.stage.frameRate = application.frameRate;
    	this.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame, this);
    }

    private _onEnterFrame(e:egret.Event) {
        if (application.battle.update()) {
    		let self = this;
    	
    		application.showUI(new BattleOptionUI(function(){
    			self._startBattle();
    		}, function(){
    			self._quitBattle();
    		}), self);        	
        }
    }
}
