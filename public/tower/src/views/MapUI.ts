class MapUI extends AbstractUI {
    private _map : Map;
    
    private _ticks : number = 0;
    
    constructor(stage:number, level:number) {
        super();
        
        this._stage = stage;
        this._level = level;
        
        this._loadSkin("mapUISkin");
    }
    
    protected onRefresh() {
        var self = this;
        
        self._map = (Map)application.objectFactory.allocateObject("Map", {stage: self._stage, level: self._level});
        self._map.loadResource().then(function(){
            self._map.create();
            self.addChild(self._map);
        }, function(error:Error){
            Toast.launch(error.message);
        })
        
        self.addEventListener(egret.Event.ENTER_FRAME,self._onEnterFrame, self);
    }
    
    private _onEnterFrame(e:egret.Event) {
        this._ticks ++;
        
        this._map.update(this._ticks);
        this._map.paint();
    }
}
