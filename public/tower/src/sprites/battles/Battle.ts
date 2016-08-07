abstract class Battle extends Entity {
    /**地基层*/
    private _baseLayer: egret.Sprite;
    /**范围层*/
    private _areaLayer: egret.Sprite;
    /**怪物层、士兵层、英雄层、塔层(层级排序)*/
    private _objLayer: egret.Sprite;
    /**弓箭、炮弹层*/
    private _bulletLayer: egret.Sprite;
    /**工具层*/
    private _toolLayer: egret.Sprite;

    //己方
    private _hero:      Hero;
    private _bases:     Base[];
    private _towers:    Tower[];
    private _soliders:  Soldier[];
    private _bullets:   Bullet[];
    
    //敌方
    private _enemies: Enemy[];
    private _cartridges: Bullet[];
    
    //当前一波敌人
    private _currentWave: number;
    //下一波敌人发动攻击时间
    private _timeToNextWave: number;
    //两波敌人发动攻击的时间间隔
    private _timeBetweenWaves: number;
    
    //地图文件地址
    private _url: string;
    
    private _lives: number;
    
    private _selectedObj: Entity;

    public constructor() {
        super();

        //地基层
        this._baseLayer = this._addLayer();
        //范围层
        this._areaLayer = this._addLayer();
        //怪物层、士兵层、英雄层、塔层(层级排序)
        this._objLayer = this._addLayer();
        //添加武器层
        this._bulletLayer = this._addLayer();
        //添加工具层
        this._toolLayer = this._addLayer();
    }
    
    public enableSelect(obj: Entity) {
        obj.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);        
    }
    
    private _touch(e:egret.TouchEvent) {
    	if (this._selectedObj == e.target) {
    		e.target.select(true);
    	} else {
    		this._selectedObj.deselect();
    		
    		this._selectedObj = this;
    		e.target.select(false);
    	}        
    }
    
    public incLives(lives: number) {
        this._lives += lives;
    }
    
    private _addLayer():egret.Sprite {
        let layer = new egret.Sprite();
        this.addChild(layer);           
        return layer;
    }
    
    public loadResource(options: any): Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            resolve(self);
        }); 
    }

    public initialize(options: any) {
        this._areaLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();

        this._currentWave = 1;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;

        this._bases = [];

        this._towers = [];
        this._soliders = [];
        this._bullets = [];
        
        this._enemies = [];
        this._cartridges = [];

        this.addBases();

        this.addHero();
    }
    
    //增加英雄
    abstract addHero();

    //增加塔基
    abstract addBases();

    //发动一波攻击
    abstract launch(wave:number);
    
    public showTool(ui:egret.DisplayObject, x:number, y:number) {
        this.hideAllTools();
        
        ui.x = x;
        ui.y = y;
        this._toolLayer.addChild(ui);
    }
    
    public hideAllTools() {
        this._toolLayer.removeChildren();
    }
    
    public update() {
        if (this._enemies.length == 0) {
            this._launchNextWave();
        }
        
        this._hero.update();
        
        this._update(this._towers, this._objLayer);
        this._update(this._soliders, this._objLayer);
        this._update(this._enemies, this._objLayer);
        this._update(this._bullets, this._bulletLayer);
        this._update(this._cartridges, this._bulletLayer);
    }
    
    private _launchNextWave() {
        this._timeToNextWave --;
        if (this._timeToNextWave <= 0) {
            this.launch(this._currentWave);
            this._currentWave ++;
            this._timeToNextWave = this._timeBetweenWaves;
        }            
    }

    private _update(objs: Entity[], layer:egret.Sprite){
        for(let i = 0; i < objs.length; i++) {
            let obj = objs[i];
            
            obj.update();
            
            if (obj.dead()) {
                objs.splice(i, 1);
                layer.removeChild(obj);
                application.pool.set(obj);
            }
        }        
    }

    public findEnemy(x: number, y: number, radius: number) : Enemy {
        var enemy = null;
        for(var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].intersect(x, y, radius)){
                if (this._enemies[i].totalSoliders() == 0) {
                    return this._enemies[i];
                } else {
                    if (!(enemy && enemy.totalSoliders() < this._enemies[i].totalSoliders)) {
                        enemy = this._enemies[i];
                    }
                }
            }
        }
        
        return enemy;
    }
    
    public addSoliders(x:number, y:number, soliders:Soldier[]) {
        for(var i = 0; i < soliders.length; i++) {
            this._soliders.push(soliders[i]);
            this._addObj(x, y, soliders[i], this._objLayer);           
        } 
    }
    
    public addEnemies(x:number, y:number, enemies:Enemy[]) {
        for(var i = 0; i < enemies.length; i++) {
            this._enemies.push(enemies[i]);
            this._addObj(x, y, enemies[i], this._objLayer);           
        } 
    }
    
    public addBullets(x:number, y:number, bullet:Bullet) {
        this._bullets.push(bullet);
        this._addObj(x, y, bullet, this._bulletLayer); 
    }
    
    public addCartridges(x:number, y:number, cartridges:Bullet[]) {
        for(var i = 0; i < cartridges.length; i++) {
            this._cartridges.push(cartridges[i]);
            this._addObj(x, y, cartridges[i], this._bulletLayer);           
        }
    }
    
    public addTower(x:number, y:number, tower:Tower) {
        this._towers.push(tower);
        this._addObj(x, y, tower, this._objLayer);
    }
    
    protected _addBase(x:number, y:number, base:Base) {
        this._bases.push(base);
        this._addObj(x, y, base, this._baseLayer);
    }

    protected _setHero(x:number, y:number, hero:Hero) {
        this._hero = hero;
        
        this._addObj(x, y, hero, this._objLayer);
    }
    
    private _addObj(x:number, y:number, obj:Entity, layer:egret.Sprite) {
        obj.x = x;
        obj.y = y;
        layer.addChild(obj);
    }
    
    private _queue(x:number, y:number, direction:EntityDirection, objs:Entity[]): Entity[] {
        var width  = objs[0].width  + 2;
        var height = objs[0].height + 2;
        
        for(var i = 0; i < objs.length; i++) {
            var obj = objs[i];

            if (i % 3 == 0) {
                obj.y = y - height;
            } else if (i % 3 == 1) {
                obj.y = y + height;
            } else {
                if (direction == EntityDirection.east) {
                    x -= width;
                } else {
                    x += width;
                }
            }
            
            obj.x = x;
        }
        
        return objs;
    }    
}
