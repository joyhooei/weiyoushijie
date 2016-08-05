class MapUI extends AbstractUI {
    private _ticks : number = 0;
    
    constructor(stage:number, level:number) {
        super("mapUISkin");
        
        this._stage = stage;
        this._level = level;
    }
    
    protected onRefresh() {
        var self = this;
        
        var options = {stage: self._stage, level: self._level};
        application.map = application.pool.get("Map" + this._stage);
        application.map.loadResource(options).then(function(){
            application.map.initialize(options);
            self.addChildAt(application.map, 0);
        }, function(error:Error){
            Toast.launch(error.message);
        })
        
        self.addEventListener(egret.Event.ENTER_FRAME,self._onEnterFrame, self);
    }

    private _onEnterFrame(e:egret.Event) {
        this._ticks ++;
        
        application.map.update(this._ticks);
    }
}
