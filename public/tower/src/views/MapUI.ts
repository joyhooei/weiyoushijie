class MapUI extends AbstractUI {
    private _map : Map;
    
    private _ticks : number = 0;
    
    constructor(stage:number, level:number) {
        super("mapUISkin");
        
        this._stage = stage;
        this._level = level;
    }
    
    protected onRefresh() {
        var self = this;
        
        var options = {stage: self._stage, level: self._level};
        self._map = _createMap();
        self._map.loadResource(options).then(function(){
            self._map.initialize(options);
            self.addChildAt(self._map, 0);
        }, function(error:Error){
            Toast.launch(error.message);
        })
        
        self.addEventListener(egret.Event.ENTER_FRAME,self._onEnterFrame, self);
    }
    
    private _createMap(): Map {
        switch(this._stage) {
            case 1: 
                return new Map01();
        }
    }
    
    private _onEnterFrame(e:egret.Event) {
        this._ticks ++;
        
        this._map.update(this._ticks);
        this._map.paint();
    }
}
