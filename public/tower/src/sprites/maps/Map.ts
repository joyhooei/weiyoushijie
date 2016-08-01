class Map extends Object {
    private _hero: Hero;
    
    private _towers: Tower[];
    
    private _npcs: NPC[];
    
    private _bullets: Bullet[];
    
    public constructor() {
        super();
    }
    
    public update(ticks:number) {
        _hero.update();
        
        for(let i = 0; i < _towers.length; i++) {
            _towers[i].update(ticks);
        }
        
        for(let i = 0; i < _npcs.length; i++) {
            _npcs[i].update(ticks);
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            _bullets[i].update(ticks);
        }
    }
    
    public paint() {
        _hero.paint();
        
        for(let i = 0; i < _towers.length; i++) {
            _towers[i].paint();
        }
        
        for(let i = 0; i < _npcs.length; i++) {
            _npcs[i].paint();
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            _bullets[i].paint();
        }            
    }
    
    private _loadMap(url:string) {
        var self = this;

        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
            var data:any = egret.XML.parse(event.target.data);
            var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
        }, url);
        
        urlLoader.load(new egret.URLRequest(url));        
    }
}
