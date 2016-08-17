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
    protected _soliders:  Soldier[];
    
    //敌方
    protected _waves: Waves;
    protected _enemies: Enemy[];

    //子弹
    protected _bullets:Bullet[];


    //地图文件地址
    protected _url: string;
    protected _map: TiledMap;
    
    protected _lives: number;
    protected _golds: number;
    
    protected _focus: Entity;
    protected _toolItem: BattleToolItem;

    public constructor() {
        super();

        //地基层
        this._baseLayer = this._addLayer();
        //怪物层、士兵层、英雄层
        this._objLayer = this._addLayer();
        //武器层
        this._bulletLayer = this._addLayer();
        //工具层
        this._toolLayer = this._addLayer();
        
        this.enableSelect(this);
    }
    
    public loadResource(options: any): Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            TiledMap.load(self._url, 800, 480).then(function(map){
                self._map = map;

                self._addBases();

                self._addHeros();
                
                self._addStandbys();

    	        resolve(self);
    	    }, function(error){
                reject(error);
            })
        }); 
    }

    public initialize(properties: any) {
        super.initialize(properties);
        
        this._lives = this._get(properties, "lives", 20);
        this._golds = this._get(properties, "golds", 1000);
        
        this._baseLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();

        this._waves = new Waves();

        this._bases = [];

        this._soliders = [];
        this._bullets = [];
        
        this._enemies = [];
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
            this.kill();
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
    
    public kill() {
        super.kill();
        
        this._eraseEntities(this._heros);
        this._eraseEntities(this._bases);
        this._eraseEntities(this._soliders);
        this._eraseEntities(this._enemies);
        this._eraseEntities(this._bullets);
        
        this._waves.erase();
    }
    
    private _eraseEntities(entities: Entity[]){
        let i = entities.length;
        while(i > 0) {
            entities[--i].erase();
        }
    }
    
    public update(): boolean {
        if (this._enemies.length == 0) {
            this._waves.launch();
        }
        
        this._updateEntities(this._heros);
        this._updateEntities(this._bases);
        this._updateEntities(this._soliders);
        this._updateEntities(this._enemies);
        this._updateEntities(this._bullets);

        return !this.active();
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
            if (this._enemies[i].reachable(x, y, radius, altitudes)){
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

    public addSolider(solider:Soldier) {
        this._soliders.push(solider);
        this._objLayer.addChild(solider);
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
}
