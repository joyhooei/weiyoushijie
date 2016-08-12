class BattleUI extends AbstractUI {
    private _stage: number;
    
    private _level: number;

    public grpSystemTools: eui.Group;
    
    public grpBoughtTools: eui.Group;
    
    constructor(stage:number, level:number) {
        super("battleUISkin");
        
        let self = this;
        
        self._stage = stage;
        self._level = level;

        self.grpSystemTools.addChild(new BattleTimeoutTooItem({category: 'solider'}));
        self.grpSystemTools.addChild(new BattleTimeoutTooItem({category: 'fireball'}));
        
        application.dao.fetch("Tool", {customer_id: application.me.attrs.id, count: {$gt: 0}}).then(function(tools){
            for(let i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleTooItem(tool));
            }
        })
        
        self.stage.frameRate = application.frameRate;
    }

    protected onRefresh() {
        var self = this;
        
        var options = {stage: self._stage, level: self._level};
        application.battle = <Battle>application.pool.get("Battle" + this._stage);
        application.battle.loadResource(options).then(function(){
            application.battle.initialize(options);
            self.addChildAt(application.battle, 0);

            self.addEventListener(egret.Event.ENTER_FRAME,self._onEnterFrame, self);
        }, function(error:Error){
            Toast.launch(error.message);
        })
    }

    private _onEnterFrame(e:egret.Event) {
        if (application.battle) {
            application.battle.update();
        }
    }
}
