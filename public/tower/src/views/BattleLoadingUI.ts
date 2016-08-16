class BattleLoadingUI extends AbstractUI {
    constructor(stage:number, level:number) {
        super("battleLoadingUISkin");
        
        let self = this;
        
        let options = {stage: stage, level: level};
        application.battle = <Battle>application.pool.get("Battle" + stage, options);
        application.battle.loadResource(options).then(function(){
            application.hideUI(self);
            
            application.showUI(new BattleUI());
        }, function(error:Error){
            application.hideUI(self);
            
            Toast.launch(error.message);
        })
    }
}
