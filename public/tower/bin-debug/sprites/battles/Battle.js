var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
        this._layers = [this._addLayer(), this._addLayer(), this._addLayer()];
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
        this._width = 800;
        this._height = 480;
    }
    var d = __define,c=Battle,p=c.prototype;
    p.loadResource = function (options) {
        var self = this;
        self._options = options;
        return Q.Promise(function (resolve, reject, notify) {
            TiledMap.load("resource/art/sprites/battles/battle" + options.stage.toString() + ".tmx", self._width, self._height).then(function (map) {
                self._map = map;
                self.addChildAt(self._map, 0);
                self._map.paint();
                self._waves = new Waves(self._width, self._height);
                self._waves.setPaths(self._map.getPaths());
                self._addWaves();
                self._getEscapeArea();
                resolve(self);
            }, function (error) {
                reject(error);
            });
        });
    };
    p._getEscapeArea = function () {
        this._escapeX = 0;
        this._escapeY = 0;
        this._escapeHeight = 0;
        this._escapeWidth = 0;
        var exits = this._map.getExits();
        if (exits.length > 0) {
            var x = exits[0][0];
            var y = exits[0][1];
            var gap = 10;
            if (x < gap) {
                this._escapeX = 0;
                this._escapeY = 0;
                this._escapeHeight = 480;
                this._escapeWidth = gap;
            }
            else if (x > 480 - gap) {
                this._escapeX = 480 - gap;
                this._escapeY = 0;
                this._escapeHeight = 480;
                this._escapeWidth = gap;
            }
            if (y < gap) {
                this._escapeX = 0;
                this._escapeY = 0;
                this._escapeHeight = gap;
                this._escapeWidth = 800;
            }
            else if (y > 800 - gap) {
                this._escapeX = 0;
                this._escapeY = 800 - gap;
                this._escapeHeight = gap;
                this._escapeWidth = 800;
            }
        }
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._maxLives = this._get(properties, "lives", 20);
        this._maxGolds = this._get(properties, "golds", 1000);
        this._heroWinned = this._get(properties, "heroWinned", null);
        this._boss = this._get(properties, "boss", null);
        this._bossLaunching = false;
        this._difficulty = this._get(properties, "difficulty", 1);
    };
    p.build = function () {
        this._lives = this._maxLives;
        this._golds = this._maxGolds;
        for (var i = 0; i < this._layers.length; i++) {
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
        this._result = new Result({ customer_id: application.me.attrs.id, stage: this._options.stage, level: this._options.level, result: 0, score: 0, unused_bases: 0, stars: 0 });
        _super.prototype.build.call(this);
    };
    p.fight = function () {
        this._waves.launchFirstWave();
        _super.prototype.fight.call(this);
    };
    p.lose = function () {
        this._result.attrs.result = 2;
        this.erase();
    };
    p.win = function () {
        this._result.attrs.result = 1;
        for (var i = 0; i < this._bases.length; i++) {
            if (this._bases[i].unused()) {
                this._result.attrs.unused_bases++;
            }
        }
        this._result.attrs.stars = this._difficulty;
        var hero = this._heroWinned;
        if (hero) {
            application.dao.fetch("Skill", { customer_id: application.me.attrs.id, claz: hero, skill: 0 }).then(function (skills) {
                if (skills.length == 0) {
                    var skill = new Skill({ customer_id: application.me.attrs.id, claz: hero, skill: 0, level: 1 });
                    skill.save();
                    Toast.launch("恭喜您，获得了英雄：" + hero);
                }
            });
        }
        this.erase();
    };
    p.readyUseTool = function (toolItem) {
        this._toolItem = toolItem;
    };
    p._touch = function (e) {
        if (this._focus == e.target) {
            if (!this._focus.select(true)) {
                this._focus = null;
            }
        }
        else {
            if (e.target == this && (this._toolItem || this._focus)) {
                var x = Math.round(e.localX);
                var y = Math.round(e.localY);
                if (this._map.walkable(x, y)) {
                    if (this._toolItem) {
                        this._toolItem.use(x, y);
                        this._toolItem = null;
                    }
                    else if (this._focus) {
                        var focusClaz = egret.getQualifiedSuperclassName(this._focus);
                        if (focusClaz == "Hero") {
                            this._focus.guardAt(x, y);
                        }
                        else if (focusClaz == "SoldierTower") {
                            if (this._focus.guardAt(x, y) == false) {
                                this.showDisableTip(x, y);
                                return;
                            }
                        }
                        this._focus.deselect();
                        this._focus = null;
                    }
                }
                else {
                    this.showDisableTip(x, y);
                }
            }
            else {
                if (this._focus) {
                    this._focus.deselect();
                }
                this._focus = e.target;
                try {
                    if (!this._focus.select(false)) {
                        this._focus = null;
                    }
                }
                catch (error) {
                    console.error("select failed! " + error.message);
                    this._focus = null;
                }
            }
        }
    };
    p.unselect = function (focus) {
        if (this._focus == focus) {
            this._focus = null;
        }
    };
    p.showDisableTip = function (x, y) {
        var tip = application.pool.get("DisableTip");
        tip.setCenterX(x);
        tip.setCenterY(y);
        this.addEntity(tip);
    };
    p.getUI = function () {
        return this._ui;
    };
    p.setUI = function (ui) {
        this._ui = ui;
    };
    p.getResult = function () {
        return this._result;
    };
    p.incLives = function (lives) {
        this._lives += lives;
        if (this._lives <= 0) {
            this.lose();
        }
        else {
            application.dao.dispatchEventWith("Battle", true, { lives: this._lives });
        }
    };
    p.getLives = function () {
        return this._lives;
    };
    p.incGolds = function (golds) {
        this._golds = Math.max(0, this._golds + golds);
        application.dao.dispatchEventWith("Battle", true, { golds: this._golds });
    };
    p.getGolds = function () {
        return this._golds;
    };
    p.getDifficulty = function () {
        return this._difficulty;
    };
    p.getCurrentWave = function () {
        return this._waves.getCurrentWave();
    };
    p.getTotalWaves = function () {
        return this._waves.getTotalWaves();
    };
    p.stain = function () {
        this.paint();
    };
    p._addLayer = function () {
        var layer = new egret.Sprite();
        layer.x = 0;
        layer.y = 0;
        layer.width = 800;
        layer.height = 480;
        this.addChild(layer);
        return layer;
    };
    //增加英雄
    p._addHeros = function () {
    };
    //增加敌人
    p._addWaves = function () {
    };
    //增加塔基
    p._addBases = function () {
        this._addBasesByName("Base1");
    };
    //增加特效
    p._addEffects = function () {
    };
    //boss出场
    p._addBoss = function () {
    };
    p._addWave = function (wave, claz, count, path) {
        this._waves.add(wave, claz, count, path);
    };
    p._addBasesByName = function (name) {
        var bases = this._map.getBases();
        for (var i = 0; i < bases.length; i++) {
            var base = application.pool.get(name, { "guardX": bases[i][2], "guardY": bases[i][3] });
            base.setCenterX(bases[i][0]);
            base.setCenterY(bases[i][1]);
            this.addBase(base);
        }
    };
    p._addHerosByName = function (heroName) {
        var pos = this._map.getHeros();
        for (var i = 0; i < pos.length; i++) {
            var hero = application.pool.get(heroName, { guardX: pos[i][0][0], guardY: pos[i][0][1] });
            hero.setCenterX(pos[i][0][0]);
            hero.setBottomY(pos[i][0][1]);
            this.addSoldier(hero);
        }
    };
    p.addWarriorsByName = function (warriorName, hero, options) {
        var pos = this._map.getHeros();
        for (var i = 0; i < pos.length; i++) {
            for (var j = 1; j < pos[i].length; j++) {
                options.guardX = pos[i][j][0];
                options.guardY = pos[i][j][1];
                var soldier = application.pool.get(warriorName, options);
                soldier.x = pos[i][0][0];
                soldier.y = pos[i][0][1];
                this.addSoldier(soldier);
            }
        }
    };
    p._addEffectByName = function (effectName, x, y, direction) {
        var effect = application.pool.get(effectName, { direction: direction });
        effect.x = x;
        effect.y = y;
        this.addEntity(effect);
        return effect;
    };
    p._addBossByName = function (claz, path) {
        var boss = application.pool.get(claz, { "paths": this._map.getPaths()[path], idleTicks: 0 });
        this.addEnemy(boss);
        return boss;
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        this._eraseEntities(this._bases);
        for (var i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].setCreator(null);
        }
        this._eraseEntities(this._soldiers);
        this._eraseEntities(this._enemies);
        this._eraseEntities(this._entities);
    };
    p._eraseEntities = function (entities) {
        var i = entities.length;
        while (i > 0) {
            var entity = entities[--i];
            entity.erase();
            if (entity.parent) {
                entity.parent.removeChild(entity);
            }
        }
    };
    p.launchWave = function (wave) {
        this._waves.launchWave(wave);
    };
    p._building = function () {
        this._updateEntities(this._soldiers);
        this._updateEntities(this._bases);
        this._updateEntities(this._entities);
    };
    p._fighting = function () {
        if (this._waves.launch()) {
            //最后一波已经走出来了
            if (this._enemies.length == 0) {
                //所有怪物都已经死掉了
                if (this._boss) {
                    if (!this._bossLaunching) {
                        this._addBoss();
                        this._bossLaunching = true;
                    }
                }
                else {
                    this.win();
                    return;
                }
            }
        }
        this._updateEntities(this._soldiers);
        this._updateEntities(this._enemies);
        this._updateEntities(this._bases);
        this._updateEntities(this._entities);
    };
    p._updateEntities = function (entities) {
        var i = entities.length;
        while (i > 0) {
            var entity = entities[--i];
            if (entity.update()) {
                if (entity.parent) {
                    entity.parent.removeChild(entity);
                }
                entities.splice(i, 1);
                application.pool.set(entity);
            }
        }
    };
    p.paint = function () {
        //do nothing
    };
    p.findSoldier = function (x, y, radius) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i].reachable(x, y, radius, [0])) {
                return this._soldiers[i];
            }
        }
        return null;
    };
    p.inEscapeArea = function (enemy) {
        if (this._escapeHeight > 0) {
            return Entity.intersect(enemy.x, enemy.y, enemy.width, enemy.height, this._escapeX, this._escapeY, this._escapeWidth, this._escapeHeight);
        }
        return false;
    };
    p.getEnemies = function () {
        var enemies = [];
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (!this.inEscapeArea(e)) {
                enemies.push(e);
            }
        }
        return enemies;
    };
    p.findEnemies = function (x, y, radius, altitudes) {
        var enemies = [];
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (e.reachable(x, y, radius, altitudes) && !this.inEscapeArea(e)) {
                enemies.push(e);
            }
        }
        return enemies;
    };
    p.findEnemy = function (x, y, radius, altitudes) {
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (e.reachable(x, y, radius, altitudes) && !this.inEscapeArea(e)) {
                return e;
            }
        }
        return null;
    };
    p.findSuitableEnemy = function (x, y, radius, altitudes) {
        var enemy = null;
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (e.reachable(x, y, radius, altitudes) && !this.inEscapeArea(e)) {
                if (e.totalSoldiers() == 0) {
                    return e;
                }
                else {
                    if (enemy == null || enemy.totalSoldiers() > e.totalSoldiers()) {
                        enemy = e;
                    }
                }
            }
        }
        return enemy;
    };
    p.killAllEnemies = function () {
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (!this.inEscapeArea(e)) {
                this._enemies[i].kill();
            }
        }
    };
    p.findSoldiers = function (x, y, radius) {
        var soldiers = [];
        for (var i = 0; i < this._soldiers.length; i++) {
            var e = this._soldiers[i];
            if (e.reachable(x, y, radius, [0])) {
                soldiers.push(e);
            }
        }
        return soldiers;
    };
    p.findSuitableSoldier = function (x, y, radius) {
        for (var i = 0; i < this._soldiers.length; i++) {
            var s = this._soldiers[i];
            if (s.reachable(x, y, radius, [0])) {
                return s;
            }
        }
        return null;
    };
    p.findTowers = function (x, y, radius) {
        var towers = [];
        for (var i = 0; i < this._bases.length; i++) {
            var e = this._bases[i];
            if (e.getTower() && e.within(x, y, radius)) {
                towers.push(e.getTower());
            }
        }
        return towers;
    };
    p.addBase = function (base) {
        this._bases.push(base);
        this._layers[0].addChild(base);
    };
    p.addTower = function (tower) {
        this._entities.push(tower);
        this._layers[0].addChild(tower);
    };
    p.addSoldier = function (soldier) {
        this._soldiers.push(soldier);
        this._layers[1].addChild(soldier);
    };
    p.addEnemy = function (enemy) {
        this._enemies.push(enemy);
        this._layers[1].addChild(enemy);
    };
    p.addBullet = function (bullet) {
        this._entities.push(bullet);
        this._layers[2].addChild(bullet);
    };
    p.addEntity = function (entity) {
        this._entities.push(entity);
        this._layers[2].addChild(entity);
    };
    p.addDirt = function (entity) {
        this._dirts.push(entity);
    };
    p.createSoldier = function (soldier) {
        var s = soldier.clone({ idleTicks: 10 * application.frameRate });
        this.addSoldier(s);
        return s;
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle',["SoldierCreator"]);
//# sourceMappingURL=Battle.js.map