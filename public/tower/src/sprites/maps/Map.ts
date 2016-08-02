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
        
        this._update(this._towers, i);
        this._update(this._soliders, i);
        this._update(this._enemies, i);
        this._update(this._bullets, i);
        this._update(this._cartridges, i);
    }
    
    public paint() {
        this._hero.paint();
        
        this._paint(this._towers);
        this._paint(this._soliders);
        this._paint(this._enemies);
        this._paint(this._bullets);
        this._paint(this._cartridges);
    }
    
    private _update(objs: Object[], ticks:number){
        for(let i = 0; i < objs.length; i++) {
            let obj = objs[i];
            
            obj.update(ticks);
            
            if (obj.dead()) {
                obj.splice(i, 1);
                
                this.removeChild(obj);
            }
        }        
    }
    
    private _paint(objs: Object[]) {
        for(let i = 0; i < objs.length; i++) {
            objs[i].paint();
        }        
    }

    private _launch(ticks: number) {
        for(var i = 0; i < this._standbys.length; i++) {
            var sb = this._standbys[i];
            if (sb.luanchTicks >= ticks) {
                this._standbys.splice(i, 1);
                
                this._enemies.push(sb);
                this._addObj(sb.x, sb.y, sb, 1);
            }
        }
    }
    
    public searchEnemy(x: number, y: number, radius: number) : Enemy {
        for(var i = 0; i < this._enemies.length; i++) {
            if (this._enemies.intersect(x, y, radius)){
                return this._enemies[i];
            }
        }
        
        return null;
    }
    
    public searchSolider(x: number, y: number, radius: number) : Solider {
        for(var i = 0; i < this._soliders.length; i++) {
            if (this._soliders.intersect(x, y, radius)){
                return this._soliders[i];
            }
        }
        
        return null;
    }
    
    public addSoliders(x:number, y:number, soliders:Solider[]) {
        for(var i = 0; i < soliders.length; i++) {
            this._soliders.push(soliders[i]);
            this._addObj(x, y, soliders[i], 1);           
        } 
    }
    
    public addBullets(x:number, y:number, bullet:Bullet) {
        this._bullets.push(bullet);
        this._addObj(x, y, bullet, 2); 
    }
    
    public addCartridges(x:number, y:number, cartridges:Bullet[]) {
        for(var i = 0; i < cartridges.length; i++) {
            this._cartridges.push(cartridges[i]);
            this._addObj(x, y, cartridges[i], 2);           
        }
    }
    
    public addTower(x:number, y:number, tower:Tower) {
        this._towers.push(tower);
        this._addObj(x, y, tower, 1);        
    }
    
    private _addBase(x:number, y:number, base:Base) {
        this._bases.push(base);
        this._addObj(x, y, base, 1);
    }

    private _setHero(x:number, y:number, hero:Hero) {
        this._hero = hero;
        
        this._addObj(x, y, hero, 1);
    }
    
    private _addStandbys(x:number, y:number, enemies:Enemy[]) {
        for(var i = 0; i < enemies.length; i++) {
            var sb = enemies[i];
            if (i % 3 == 0) {
                sb.y = y - sb.height;
            } else if (i % 3 == 1) {
                sb.y = y + sb.height;
            } else {
                if (x <= 0) {
                    x = x - sb.width - 5;
                } else {
                    x = x + sb.width + 5;
                }
            }
            
            sb.x = x;
            this._standbys.push(sb);
        }
    }
    
    private _addObj(x:number, y:number, obj:Object, zIndex:number) {
        obj.x = x;
        obj.y = y;
        this.addChildAt(obj, zIndex);
    }
}
