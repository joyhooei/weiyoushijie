var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
        this._layers = [this._addLayer(), this._addLayer(), this._addLayer()];
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
        this._waves = new Waves(800, 480);
    }
    var d = __define,c=Battle,p=c.prototype;
    p.loadResource = function (options) {
        var self = this;
        self._options = options;
        return Q.Promise(function (resolve, reject, notify) {
            TiledMap.load("resource/art/sprites/battles/battle" + options.stage.toString() + ".tmx", 800, 480).then(function (map) {
                self._map = map;
                self.addChildAt(self._map, 0);
                self._map.paint();
                resolve(self);
            }, function (error) {
                reject(error);
            });
        });
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._maxLives = this._get(properties, "lives", 20);
        this._maxGolds = this._get(properties, "golds", 1000);
        this._heroWinned = this._get(properties, "heroWinned", null);
    };
    p.ready = function () {
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
        this._result = new Result({ customer_id: application.me.attrs.id, stage: this._options.stage, level: this._options.level, result: 0, score: 0, unused_bases: this._map.getBases().length, stars: 0 });
        this.fight();
    };
    p.start = function () {
        this._addWaves(this._map.getPaths());
        this._waves.launchFirst();
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
        if (this._result.attrs.level == 1) {
            if (this._lives >= 18) {
                this._result.attrs.stars = 3;
            }
            else if (this._lives >= 6) {
                this._result.attrs.stars = 2;
            }
            else {
                this._result.attrs.stars = 1;
            }
        }
        this.erase();
        if (this._heroWinned) {
            application.dao.fetch("Legend", { customer_id: application.me.attrs.id, name: this._heroWinned }).then(function (legends) {
                if (legends.length == 0) {
                    var legend = new Legend({ customer_id: application.me.attrs.id, name: this._heroWinned, level: 1 });
                    legend.save();
                    Toast.launch("恭喜您，获得了英雄：" + this._heroWinned);
                }
            });
        }
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
            if (e.target == this) {
                var x = Math.round(e.localX);
                var y = Math.round(e.localY);
                if (this._map.walkable(x, y)) {
                    if (this._toolItem) {
                        this._toolItem.use(x, y);
                        this._toolItem = null;
                    }
                    else if (this._focus) {
                        if (egret.getQualifiedSuperclassName(this._focus) == "Hero") {
                            this._focus.moveTo(x, y);
                        }
                        this._focus.deselect();
                        this._focus = null;
                    }
                }
                else {
                    //显示不能放置图片
                    var tip = application.pool.get("DisableTip");
                    tip.setCenterX(x);
                    tip.setCenterY(y);
                    this.addEntity(tip);
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
    p.getWaves = function () {
        return this._waves.getCurrentWave();
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
    p._addWaves = function (paths) {
    };
    //增加塔基
    p._addBases = function () {
        this._addBasesByName("Base1");
    };
    //增加特效
    p._addEffects = function () {
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
            hero.setLegend(Legend.getByName(application.legends, heroName));
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
            entities[--i].erase();
        }
    };
    p.launch = function (wave, queue) {
        this._waves.launchQueue(wave, queue);
    };
    p._fighting = function () {
        if (this._enemies.length == 0) {
            this._waves.launch();
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
                entities.splice(i, 1);
            }
        }
    };
    p.paint = function () {
        //每次只刷新20个，以免刷新不及时
        var dirts = this._dirts.splice(0, 20);
        var i = dirts.length;
        while (i > 0) {
            dirts[--i].paint();
        }
    };
    p.findSoldier = function (x, y, radius) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i].reachable(x, y, radius, [0])) {
                return this._soldiers[i];
            }
        }
        return null;
    };
    p.getEnemies = function () {
        return this._enemies;
    };
    p.findEnemies = function (x, y, radius, altitudes) {
        var enemies = [];
        for (var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].reachable(x, y, radius, altitudes)) {
                enemies.push(this._enemies[i]);
            }
        }
        return enemies;
    };
    p.findEnemy = function (x, y, radius, altitudes) {
        for (var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].reachable(x, y, radius, altitudes)) {
                return this._enemies[i];
            }
        }
        return null;
    };
    p.findSuitableEnemy = function (x, y, radius, altitudes) {
        var enemy = null;
        for (var i = 0; i < this._enemies.length; i++) {
            var e = this._enemies[i];
            if (e.reachable(x, y, radius, altitudes)) {
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
            this._enemies[i].kill();
        }
    };
    p.addBase = function (base) {
        this._bases.push(base);
        this._layers[0].addChild(base);
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
        if (!entity.dead()) {
            this._dirts.push(entity);
        }
    };
    p.createSoldier = function (soldier) {
        this.addSoldier(soldier.relive(10 * application.frameRate));
        return soldier;
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle',["SoldierCreator"]);
//# sourceMappingURL=Battle.js.map