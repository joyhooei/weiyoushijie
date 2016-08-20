class Battle extends Entity {
    /**地基层*/
    protected _baseLayer: egret.Sprite;
    /**怪物层、士兵层层级排序)*/
    protected _objLayer: egret.Sprite;
    /**弓箭、炮弹层*/
    protected _bulletLayer: egret.Sprite;
    /**工具层*/
    protected _toolLayer: egret.Sprite;

    //己方
    protected _heros:     Hero[];
    protected _bases:     Base[];
    protected _soldiers:  Soldier[];
    
    //敌方
    protected _waves: Waves;
    protected _enemies: Enemy[];

    //子弹
    protected _bullets:Bullet[];
    
    //需要重画的对象
    protected _dirts: Entity[];

    //地图文件地址
    protected _url: string;
    protected _map: TiledMap;
    
    protected _maxLives: number;
    protected _maxGolds: number;
    
    protected _lives: number;
    protected _golds: number;
    
    protected _focus: Entity;
    protected _toolItem: BattleToolItem;

    public constructor() {
        super();

        //地基层
        this._baseLayer     = this._addLayer();
        //怪物层、士兵层、英雄层
        this._objLayer      = this._addLayer();
        //子弹层
        this._bulletLayer   = this._addLayer();
        //工具层
        this._toolLayer     = this._addLayer();

        this._waves = new Waves();

        this._bases = [];
 
        this._heros = [];
       
        this.enableSelect(this);
    }
    
    public loadResource(options: any): Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            TiledMap.load(self._url, 800, 480).then(function(map){
                self._map = map;
                self.addChildAt(self._map, 0);
                self._map.paint();

    	        resolve(self);
    	    }, function(error){
                reject(error);
            })
        }); 
    }

    public initialize(properties: any) {
        super.initialize(properties);
        
        this._maxLives = this._get(properties, "lives", 20);
        this._maxGolds = this._get(properties, "golds", 1000);
    }

    public start() {
        this._lives = this._maxLives;
        this._golds = this._maxGolds;
         
        this._baseLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();

        this._soldiers = [];
        this._bullets = [];
        
        this._enemies = [];
        
        this._dirts = [];

        this._addBases();

        this._addHeros();
        
        this._addStandbys();

        this.fight();
    }
    
    public enableSelect(entity: Entity) {
        entity.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);        
    }
    
    public readyUseTool(toolItem: BattleToolItem) {
        this._toolItem = toolItem;
    }
    
    private _touch(e:egret.TouchEvent) {
    	if (this._focus == e.target) {
    		e.target.select(true);
    	} else {
    	    if (e.target == this) {
    	        let x = Math.round(e.localX);
                let y = Math.round(e.localY);
                
                if (this._map.walkable(x, y)) {
                    if (this._toolItem) {
                        this._toolItem.use(x, y);
                        
                        this._toolItem = null;
                    } else if (this._focus) {
    	                let baseClassName = egret.getQualifiedSuperclassName(this._focus);
        	            if (baseClassName == "Hero") {
        	                (<Hero>this._focus).moveTo(x, y);
        	            }
        	            
        	            this._focus = null;
        	        }
                } else {
                    //显示不能放置图片
                    let tip = application.pool.get("NotMoveableTip");
                    tip.x = x;
                    tip.y = y;
                    this.addTip(tip);
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
        
        if (this._lives <= 0) {
            this.erase();
        } else {
            application.dao.dispatchEventWith("Battle", true, {lives: this._lives});
        }
    }
    
    public getLives(): number {
        return this._lives;
    }
    
    public incGolds(golds: number) {
        this._golds += golds;
        
        application.dao.dispatchEventWith("Battle", true, {golds: this._golds});
    }
    
    public getGolds(): number {
        return this._golds;
    }

    public stain() {
    }
    
    private _addLayer():egret.Sprite {
        let layer = new egret.Sprite();
        layer.x = 0;
        layer.y = 0;
        layer.width = 800;
        layer.height = 480;
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
    protected _addBases() {
        let bases = this._map.getBases();
        
        for(let i = 0; i < bases.length; i++) {
            let base = <Base>application.pool.get("Base", {"guardX": bases[i][2], "guardY": bases[i][3]});
            base.x = bases[i][0];
            base.y = bases[i][1];
            this.addBase(base);
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
    
    public erase() {
        super.erase();
        
        this._eraseEntities(this._heros);
        this._eraseEntities(this._bases);
        this._eraseEntities(this._soldiers);
        this._eraseEntities(this._enemies);
        this._eraseEntities(this._bullets);
    }
    
    private _eraseEntities(entities: Entity[]){
        let i = entities.length;
        while(i > 0) {
            entities[--i].erase();
        }
    }
    
    public launch() {
        this._waves.launchNow();
    }
    
    public _fighting() {
        if (this._enemies.length == 0) {
            this._waves.launch();
        }
        
        if (this._ticks % 2 == 0) {
            this._updateEntities(this._heros);
            this._updateEntities(this._bases);
            this._updateEntities(this._soldiers);
            this._updateEntities(this._enemies);            
        } else {
            this._updateEntities(this._bullets);
        }
    }

    private _updateEntities(entities: Entity[]){
        let i = entities.length;
        while(i > 0) {
            let entity = entities[--i];
            if (entity.update()) {
                entities.splice(i, 1);
            }
        }        
    }
    
    public paint() {
        //每次只刷新20个，以免刷新不及时
        let dirts = this._dirts.splice(0, 20);
        
        let i = dirts.length;
        while(i > 0) {
            dirts[--i].paint();
        }
    }

    public findSoldier(x: number, y: number, radius: number) : Soldier {
        for(let i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i].reachable(x, y, radius, [0])){
                return this._soldiers[i];
            }
        }
        
        return null;
    }

    public findEnemies(x: number, y: number, radius: number, altitudes: number[]) : Enemy[] {
        let enemies = [];
        
        for(let i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].reachable(x, y, radius, altitudes)){
                enemies.push(this._enemies[i]);
            }
        }
        
        return enemies;
    }

    public findEnemy(x: number, y: number, radius: number, altitudes: number[]) : Enemy {
        for(let i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].reachable(x, y, radius, altitudes)){
                return this._enemies[i];
            }
        }
        
        return null;
    }

    public findSuitableEnemy(x: number, y: number, radius: number, altitudes: number[]) : Enemy {
        let enemy = null;
        
        for(let i = 0; i < this._enemies.length; i++) {
            let e = this._enemies[i];
            
            if (e.reachable(x, y, radius, altitudes)){
                if (e.totalSoldiers() == 0) {
                    return e;
                } else {
                    if (enemy == null || enemy.totalSoldiers() > e.totalSoldiers()) {
                        enemy = e;
                    }
                }
            }
        }
        
        return enemy;
    }

    public addSoldier(soldier:Soldier) {
        this._soldiers.push(soldier);
        this._objLayer.addChild(soldier);
    }
    
    public addEnemy(enemy:Enemy) {
        this._enemies.push(enemy);
        this._objLayer.addChild(enemy);          
    }
    
    public killAllEnemies() {
        for(let i = 0; i < this._enemies.length; i++) {
            this._enemies[i].kill();
        }
    }
    
    public addBullet(bullet:Bullet) {
        this._bullets.push(bullet);
        this._bulletLayer.addChild(bullet);     
    }

    public addBase(base:Base) {
        this._bases.push(base);
        this._baseLayer.addChild(base);
    }

    public addHero(hero:Hero) {
        this._heros.push(hero);
        this._objLayer.addChild(hero);      
    }

    public addTip(tip:Entity) {
        this._bulletLayer.addChild(tip);      
    }
    
    public addDirt(entity: Entity) {
        this._dirts.push(entity);
    }
}
