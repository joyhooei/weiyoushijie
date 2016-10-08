class Battle extends Entity implements SoldierCreator {
    protected _layers: egret.Sprite[];

    //己方
    protected _soldiers:  Soldier[];
    protected _bases: Base[];
    
    //敌方
    protected _waves: Waves;
    protected _enemies: Enemy[];

    //其它实体
    protected _entities: Entity[];
    
    //需要重画的对象
    protected _dirts: Entity[];

    //地图
    protected _map: TiledMap;
    
    protected _maxLives: number;
    protected _maxGolds: number;
    
    protected _lives: number;
    protected _golds: number;
    protected _heroWinned: string;
    
    protected _focus: SelectableEntity;
    protected _toolItem: BattleToolItem;
    
    protected _result: Result;
    protected _options: any;

    public constructor() {
        super();

        this._layers    = [this._addLayer(), this._addLayer(), this._addLayer()];

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);    
        
        this._waves = new Waves(800, 480);
    }
    
    public loadResource(options: any): Q.Promise<any> {
        let self = this;
        
        self._options = options;
        
        return Q.Promise<any>(function(resolve,reject,notify) {
            TiledMap.load("resource/art/sprites/battles/battle" + options.stage.toString() + ".tmx", 800, 480).then(function(map){
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
        this._heroWinned = this._get(properties, "heroWinned", null);
    }

    public ready() {
        this._lives = this._maxLives;
        this._golds = this._maxGolds;
        
        for(let i = 0; i < this._layers.length; i++) {
            this._layers[i].removeChildren();
        }

        this._soldiers = [];
        this._enemies = [];
        this._entities = [];
        this._bases = [];

        this._dirts = [];

        this._addBases();
        this._addHeros();
        
        this._addEffects();
       
        this._result = new Result({customer_id: application.me.attrs.id, stage: this._options.stage, level: this._options.level, result: 0, score: 0, unused_bases: this._map.getBases().length, stars: 0});

        this.fight();
    }

    public start() {
        this._addWaves(this._map.getPaths());
        this._waves.launchFirst();
    }
    
    public lose() {
        this._result.attrs.result = 2;

        this.erase();
    }
    
    public win() {
        this._result.attrs.result = 1;
        
        for(let i = 0; i < this._bases.length; i++) {
            if (this._bases[i].unused()) {
                this._result.attrs.unused_bases ++;
            }
        }
        
        if (this._result.attrs.level == 1) {
            if (this._lives >= 18) {
                this._result.attrs.stars = 3;
            } else if (this._lives >= 6) {
                this._result.attrs.stars = 2;
            } else {
                this._result.attrs.stars = 1;
            }
        }

        this.erase();   
        
        if (this._heroWinned) {
            application.dao.fetch("Legend", {customer_id: application.me.attrs.id, name:this._heroWinned}).then(function(legends){
                if (legends.length == 0) {
                    let legend = new Legend({customer_id: application.me.attrs.id, name:this._heroWinned, level: 1});
                    legend.save();
                    
                    Toast.launch("恭喜您，获得了英雄：" + this._heroWinned);
                }
            });
        }
    }
    
    public readyUseTool(toolItem: BattleToolItem) {
        this._toolItem = toolItem;
    }
    
    private _touch(e:egret.TouchEvent) {
    	if (this._focus == e.target) {
    		if (!this._focus.select(true)) {
                this._focus = null;
            }
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
        	            if (baseClassName == "Hero" || baseClassName == "Soldier") {
        	                (<Soldier>this._focus).moveTo(x, y);
        	            }

                        this._focus.deselect();
        	            
        	            this._focus = null;
        	        }
                } else {
                    //显示不能放置图片
                    let tip = <Tip>application.pool.get("DisableTip");
                    tip.setCenterX(x);
                    tip.setCenterY(y);
                    this.addEntity(tip);
                }
    	    } else {
                if (this._focus) {
        		    this._focus.deselect();
                }
        		
                this._focus = e.target;
                try {
                    if (!this._focus.select(false)) {
                        this._focus = null;
                    }
                } catch (error) {
                    console.error("select failed! " + error.message);
                    this._focus = null;
                }
    	    }
    	}        
    }
    
    public getResult(): Result {
        return this._result;
    }
    
    public incLives(lives: number) {
        this._lives += lives;
        
        if (this._lives <= 0) {
            this.lose();
        } else {
            application.dao.dispatchEventWith("Battle", true, {lives: this._lives});
        }
    }
    
    public getLives(): number {
        return this._lives;
    }
    
    public incGolds(golds: number) {
        this._golds = Math.max(0, this._golds + golds);
        
        application.dao.dispatchEventWith("Battle", true, {golds: this._golds});
    }
    
    public getGolds(): number {
        return this._golds;
    }
    
    public getWaves(): number {
        return this._waves.getCurrentWave();
    }
    
    public stain() {
        this.paint();
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
    protected _addWaves(paths:number[][][]) {
    }

    //增加塔基
    protected _addBases() {
        this._addBasesByName("Base1");        
    }
    
    //增加特效
    protected _addEffects() {
    }
    
    protected _addBasesByName(name:string) {
        let bases = this._map.getBases();
        
        for(let i = 0; i < bases.length; i++) {
            let base = <Base>application.pool.get(name, {"guardX": bases[i][2], "guardY": bases[i][3]});
            base.setCenterX(bases[i][0]);
            base.setCenterY(bases[i][1]);
            this.addBase(base);
        }        
    }
    
    protected _addHerosByName(heroName:string) {
        let pos = this._map.getHeros();
        for(let i = 0; i < pos.length; i++) {
            let hero = <Hero>application.pool.get(heroName, {guardX: pos[i][0][0], guardY: pos[i][0][1]});
            hero.setCenterX(pos[i][0][0]);
            hero.setBottomY(pos[i][0][1]);
            hero.setLegend(Legend.getByName(application.legends, heroName));
            this.addSoldier(hero);
        }
    }
    
    public addWarriorsByName(warriorName:string, hero: Hero, options:any) {
        let pos = this._map.getHeros();
        for(let i = 0; i < pos.length; i++) {
            for(let j = 1; j < pos[i].length; j++) {
                options.guardX = pos[i][j][0];
                options.guardY = pos[i][j][1];
                let soldier = <Soldier>application.pool.get(warriorName, options);
                soldier.x = pos[i][0][0];
                soldier.y = pos[i][0][1];
                this.addSoldier(soldier);
            }
        }
    }    
    
    protected _addEffectByName(effectName:string, x: number, y:number, direction:EntityDirection) {
        let effect:Effect = <Effect>application.pool.get(effectName, {direction:direction});
        effect.x = x;
        effect.y = y;
        this.addEntity(effect);
    }    

    public erase() {
        super.erase();
        
        this._eraseEntities(this._bases);
        
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].setCreator(null);
        }
        this._eraseEntities(this._soldiers);
        
        this._eraseEntities(this._enemies);
        
        this._eraseEntities(this._entities);
    }

    private _eraseEntities(entities: Entity[]){
        let i = entities.length;
        while(i > 0) {
            entities[--i].erase();
        }
    }
    
    public launch(wave: number, queue:number) {
        this._waves.launchQueue(wave, queue);
    }
    
    public _fighting() {
        if (this._enemies.length == 0) {
            this._waves.launch();
        }
        
        this._updateEntities(this._soldiers);
        this._updateEntities(this._enemies);    
        this._updateEntities(this._bases);   
        this._updateEntities(this._entities);            
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
    
    public killAllEnemies() {
        for(let i = 0; i < this._enemies.length; i++) {
            this._enemies[i].kill();
        }
    }

    public addBase(base:Base) {
        this._bases.push(base);
        this._layers[0].addChild(base);
    }

    public addSoldier(soldier:Soldier) {
        this._soldiers.push(soldier);
        this._layers[1].addChild(soldier);
    }
    
    public addEnemy(enemy:Enemy) {
        this._enemies.push(enemy);
        this._layers[1].addChild(enemy);          
    }
    
    public addBullet(bullet:Bullet) {
        this._entities.push(bullet);
        this._layers[2].addChild(bullet);
    }

    public addEntity(entity:Entity) {
        this._entities.push(entity);
        this._layers[2].addChild(entity);          
    }
    
    public addDirt(entity: Entity) {
        if (!entity.dead()) {
            this._dirts.push(entity);
        }
    }
    
    public createSoldier(soldier: Soldier):Soldier {
        this.addSoldier(soldier.relive(10 * application.frameRate));
        return soldier;
    }
}
