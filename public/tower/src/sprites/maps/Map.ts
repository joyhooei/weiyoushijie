class Map extends Object {
    //己方
    private _hero:      Hero;
    private _towers:    Tower[];
    private _soliders:  Solidier[];
    private _bullets:   Bullet[];
    
    //敌方
    private _enemies: Enemy[];
    private _cartridges: Bullet[];
    
    //地图文件地址
    private _url: string;
    
    public constructor() {
        super();
    }
    
    public loadMap(): Q.Promise<tiled.TMXTilemap> {
        var self = this;

        return Q.Promise<tiled.TMXTilemap>(function(resolve, reject, notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, url);
                tmxTileMap.render();
                resolve(tmxTileMap);
            }, url);
            
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject(new Error('加载地图失败'));
            }, url);
            
            urlLoader.load(new egret.URLRequest(url)); 
        }）；        
    }

    public create(options: any) {
        this.addChild(options.tmxTileMap);
    }
    
    public update(ticks:number) {
        this._hero.update();
        
        for(let i = 0; i < _towers.length; i++) {
            this._towers[i].update(ticks);
        }
        
        for(let i = 0; i < _npcs.length; i++) {
            this._npcs[i].update(ticks);
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            this._bullets[i].update(ticks);
        }
        
        this.loadEnemies(ticks);
    }
    
    public paint() {
        this._hero.paint();
        
        for(let i = 0; i < _towers.length; i++) {
            this._towers[i].paint();
        }
        
        for(let i = 0; i < _npcs.length; i++) {
            this._npcs[i].paint();
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            this._bullets[i].paint();
        }            
    }

    protected loadEnemies(ticks: number) {
        
    }
}
