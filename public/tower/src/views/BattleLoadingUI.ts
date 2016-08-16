class BattleLoadingUI extends AbstractUI {
    constructor(stage:number, level:number) {
        super("battleLoadingUISkin");
        
        var options = {stage: self._stage, level: self._level};
        application.battle = <Battle>application.pool.get("Battle" + this._stage, options);
        application.battle.loadResource(options).then(function(){
            application.hideUI(this);
            application.showUI(new BattleUI(stage, level));
        }, function(error:Error){
            Toast.launch(error.message);
        }) 
    }
}
