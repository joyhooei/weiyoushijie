abstract class Map extends Object {
    //己方
    private _hero:      Hero;
    private _bases:     Base[];
    private _towers:    Tower[];
    private _soliders:  Solidier[];
    private _bullets:   Bullet[];
    
    //敌方
    private _standbys: Enemy[];
    private _enemies: Enemy[];
    private _cartridges: Bullet[];
    
    //地图文件地址
    private _url: string;
    
    public constructor() {
        super();
    }
    
    public loadResource(options: any): Q.Promise<tiled.TMXTilemap> {
        var self = this;

        return Q.Promise<tiled.TMXTilemap>(function(resolve, reject, notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, url);
                tmxTileMap.render();
                self.addChildAt(tmxTileMap, 0);
                resolve(tmxTileMap);
            }, url);
            
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject(new Error('加载资源失败'));
            }, url);
            
            urlLoader.load(new egret.URLRequest(url)); 
        }）；        
    }

    public initialize(options: any) {
        this.removeChildren();

        this._towers = [];
        this._soliders = [];
        this._bullets = [];
        
        this._enemies = [];
        this._cartridges = [];
        
        this.addHero();
        this.addStandbys();
        this.addBases();
    }
    
    //增加英雄
    abstract addHero();
    //增加敌人
    abstract addStandbys();
    //增加塔基
    abstract addBases();
    
    public update(ticks:number) {
        this._launch(ticks);
        
        this._hero.update(ticks);
        
        for(let i = 0; i < _towers.length; i++) {
            this._towers[i].update(ticks);
        }
        
        for(let i = 0; i < _soliders.length; i++) {
            this._soliders[i].update(ticks);
        }        
        
        for(let i = 0; i < _enemies.length; i++) {
            this._enemies[i].update(ticks);
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            this._bullets[i].update(ticks);
        }
         
        for(let i = 0; i < _cartridges.length; i++) {
            this._cartridges[i].update(ticks);
        }
    }
    
    public paint() {
        this._hero.paint();
        
        for(let i = 0; i < _towers.length; i++) {
            this._towers[i].paint();
        }
        
        for(let i = 0; i < _soliders.length; i++) {
            this._soliders[i].paint();
        }        
        
        for(let i = 0; i < _enemies.length; i++) {
            this._enemies[i].paint();
        }        
        
        for(let i = 0; i < _bullets.length; i++) {
            this._bullets[i].paint();
        }
         
        for(let i = 0; i < _cartridges.length; i++) {
            this._cartridges[i].paint();
        }
    }

    private _launch(ticks: number) {
        for(var i = 0; i < this._standbys.length; i++) {
            var enemy = this._standbys[i];
            if (enemy.luanchTicks >= ticks) {
                this._standbys.splice(i, 1);
                
                this._enemies.push(enemy);
            }
        }
    }
    
    private _addBase(x:number, y:number, base:Base) {
        base.x = x;
        base.y = y;
        this._bases.push(base);
    }

    private _setHero(x:number, y:number, hero:Hero) {
        hero.x = x;
        hero.y = y;
        this._hero = hero;
    }
    
    private addStandbys(x:number, y:number, enemies:Enemy[]) {
        for(var i = 0; i < enemies.length; i++) {
            var sb = enemies[i];
            sb.x = x;
            sb.y = y;
            this._standbys.push(sb);
        }
    }    
}
