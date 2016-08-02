class ObjectFactory {
    private _maps : Map[];
    
    public allocateMap(options:any) : Map {
        for(var i = 0; i < this._maps.length; i++) {
            if (this._maps[i].match(options)) {
                _maps.splice(i, 1);
                return this._maps[i];
            }
        }
        
        return new Map();
    }
    
    public releaseMap(map: Map) {
        _maps.push(map);
    }
}
