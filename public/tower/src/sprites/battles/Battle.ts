class Battle extends Entity {
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
    private _heros:     Hero[];
    private _bases:     Base[];
    private _towers:    Tower[];
    private _soliders:  Soldier[];
    private _bullets:   Bullet[];
    
    //敌方
    private _standbys: Enemy[];
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
    private _map: TiledMap;
    
    private _lives: number;
    
    private _focus: Entity;

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
        
        this.enableSelect(this);
    }
    
    public loadResource(options: any): Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            TiledMap.load(self._url, 800, 480).then(function(map){
                self._map = map;
    	        resolve(self);
    	    }, function(error){
                reject(error);
            })
        }); 
    }

    public initialize(properties: any) {
        super.initialize(properties);
        
        this._baseLayer.removeChildren();
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

        this._addBases();

        this._addHeros();
        
        this._addStandbys();
    }
    
    public enableSelect(obj: Entity) {
        obj.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);        
    }
    
    private _touch(e:egret.TouchEvent) {
    	if (this._focus == e.target) {
    		e.target.select(true);
    	} else {
    	    if (e.target == this) {
    	        let baseClassName = egret.getQualifiedSuperclassName(this._focus);
    	        let x = Math.round(e.localX);
                let y = Math.round(e.localY);
                if (this._map.walkable(x, y)) {
    	            if (baseClassName == "Hero") {
    	                (<Hero>this._focus).moveTo(x, y);
    	            }
                } else {
                    //显示不能放置图片
                    
                }
    	    } else {
        		this._focus.deselect();
        		
        		this._focus = this;
        		e.target.select(false);
    	    }
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

    //增加英雄
    protected _addHeros() {
    }
    
    //增加敌人
    protected _addStandbys() {
        
    }

    //增加塔基
    private _addBases() {
        let bases = this._map.getBases();
        
        for(let i = 0; i < bases.length; i++) {
            let base = <Base>application.pool.get("Base", {"guardLocation": [bases[i][2], bases[i][3]]});
            this._addBase(bases[i][0], bases[i][1], base);
        }
    }

    protected _addWaveStandbys(wave:number, className:string, count:number, paths:number[][]) {
        if (this._waves[wave]) {
            this._waves[wave] = [];
        }
        
        for(let i = 0; i < count; i++) {
            let properties = application.characters[className].getProperties();
            properties.paths = paths;

            let enemy = <Enemy>application.pool.get(className, properties);
            this._waves[wave].push(enemy);
        }
    }

    //发动一波攻击
    private _launch(wave:number) {
        for(let i = 0; i < this._waves[wave].length; i++) {
            let enemy = this._waves[wave][i];
            this.addEnemy(enemy.x, enemy.y, enemy);
        }
    }
    
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
        
        this._updateLayer(this._towers, this._objLayer);
        this._updateLayer(this._soliders, this._objLayer);
        this._updateLayer(this._enemies, this._objLayer);
        this._updateLayer(this._bullets, this._bulletLayer);
        this._updateLayer(this._cartridges, this._bulletLayer);
    }
    
    private _launchNextWave() {
        this._timeToNextWave --;
        if (this._timeToNextWave <= 0) {
            this._launch(this._currentWave);
            this._currentWave ++;
            this._timeToNextWave = this._timeBetweenWaves;
        }            
    }

    private _updateLayer(objs: Entity[], layer:egret.Sprite){
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
    
    public addEnemy(x:number, y:number, enemy:Enemy) {
        this._enemies.push(enemy);
        this._addObj(x, y, enemy, this._objLayer);           
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
}
