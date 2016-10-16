class BattleLoadingUI extends AbstractUI {
    constructor(stage:number) {
        super("battleLoadingUISkin");
        
        let self = this;
        
        application.battle = <Battle>application.pool.get("Battle" + stage);
        application.battle.loadResource({stage: stage, level: 1}).then(function(){
            application.hideUI(self);
            
            application.showUI(new BattleUI());
        }, function(error:Error){
            application.hideUI(self);
            
            Toast.launch(error.message);
        })
    }
}
