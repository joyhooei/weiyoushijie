class BattleUI extends AbstractUI {
    private _ticks : number = 0;
    
    private _stage: number;
    
    private _level: number;
    
    constructor(stage:number, level:number) {
        super("battleUISkin");
        
        this._stage = stage;
        this._level = level;
    }
    
    protected onRefresh() {
        var self = this;
        
        var options = {stage: self._stage, level: self._level};
        application.battle = <Battle>application.pool.get("Map" + this._stage);
        application.battle.loadResource(options).then(function(){
            application.battle.initialize(options);
            self.addChildAt(application.battle, 0);
        }, function(error:Error){
            Toast.launch(error.message);
        })
        
        self.addEventListener(egret.Event.ENTER_FRAME,self._onEnterFrame, self);
    }

    private _onEnterFrame(e:egret.Event) {
        this._ticks ++;
        
        application.battle.update();
    }
}
