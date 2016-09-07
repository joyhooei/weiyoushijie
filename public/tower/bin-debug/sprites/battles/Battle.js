var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
        this._baseLayer = this._addLayer();
        this._objLayer = this._addLayer();
        this._bulletLayer = this._addLayer();
        this._rangeLayer = this._addLayer();
        this._toolLayer = this._addLayer();
        this._waves = new Waves();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
    }
    var d = __define,c=Battle,p=c.prototype;
    p.loadResource = function (options) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            TiledMap.load(self._url, 800, 480).then(function (map) {
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
    };
    p.start = function () {
        this._lives = this._maxLives;
        this._golds = this._maxGolds;
        this._baseLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();
        this._rangeLayer.removeChildren();
        this._soldiers = [];
        this._enemies = [];
        this._entities = [];
        this._dirts = [];
        this._addBases();
        this._addHeros();
        this._addStandbys();
        this.fight();
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
                        var baseClassName = egret.getQualifiedSuperclassName(this._focus);
                        if (baseClassName == "Hero" || baseClassName == "Soldier") {
                            this._focus.moveTo(x, y);
                        }
                        this._focus = null;
                    }
                }
                else {
                    //显示不能放置图片
                    var tip = application.pool.get("DisableTip");
                    tip.setCenterX(x);
                    tip.setCenterY(y);
                    this.addTip(tip);
                }
            }
            else {
                if (this._focus) {
                    this._focus.deselect();
                }
                this._focus = e.target;
                if (!this._focus.select(false)) {
                    this._focus = null;
                }
            }
        }
    };
    p.incLives = function (lives) {
        this._lives += lives;
        if (this._lives <= 0) {
            this.erase();
        }
        else {
            application.dao.dispatchEventWith("Battle", true, { lives: this._lives });
        }
    };
    p.getLives = function () {
        return this._lives;
    };
    p.incGolds = function (golds) {
        this._golds += golds;
        application.dao.dispatchEventWith("Battle", true, { golds: this._golds });
    };
    p.getGolds = function () {
        return this._golds;
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
    p._addStandbys = function () {
    };
    //增加塔基
    p._addBases = function () {
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
    p._addHerosByName = function (heroName, warriorName) {
        var pos = this._map.getHeros();
        for (var i = 0; i < pos.length; i++) {
            var hero = application.pool.get(heroName, { guardX: pos[i][0][0], guardY: pos[i][0][1] });
            hero.x = pos[i][0][0];
            hero.y = pos[i][0][1];
            this.addHero(hero);
            for (var j = 1; j < pos[i].length; j++) {
                var soldier = application.pool.get(warriorName, { guardX: pos[i][j][0], guardY: pos[i][j][1] });
                soldier.x = pos[i][0][0];
                soldier.y = pos[i][0][1];
                soldier.setCreator(hero);
                this.addSoldier(soldier);
            }
        }
    };
    p.showTool = function (ui, x, y) {
        this.hideAllTools();
        ui.x = x;
        ui.y = y;
        this._toolLayer.addChild(ui);
    };
    p.hideAllTools = function () {
        this._toolLayer.removeChildren();
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
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
    p.launch = function () {
        this._waves.launchNow();
    };
    p._fighting = function () {
        if (this._enemies.length == 0) {
            this._waves.launch();
        }
        if (this._ticks % 2 == 0) {
            this._updateEntities(this._soldiers);
            this._updateEntities(this._enemies);
        }
        else {
            this._updateEntities(this._entities);
        }
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
    p.addHero = function (hero) {
        this._soldiers.push(hero);
        this._objLayer.addChild(hero);
    };
    p.addSoldier = function (soldier) {
        this._soldiers.push(soldier);
        this._objLayer.addChild(soldier);
    };
    p.addEnemy = function (enemy) {
        this._enemies.push(enemy);
        this._objLayer.addChild(enemy);
    };
    p.killAllEnemies = function () {
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].kill();
        }
    };
    p.addBase = function (base) {
        this._entities.push(base);
        this._baseLayer.addChild(base);
    };
    p.addBullet = function (bullet) {
        this._entities.push(bullet);
        this._bulletLayer.addChild(bullet);
    };
    p.addTip = function (entity) {
        this._entities.push(entity);
        this._rangeLayer.addChild(entity);
    };
    p.addRange = function (entity) {
        this._entities.push(entity);
        this._rangeLayer.addChild(entity);
    };
    p.addDirt = function (entity) {
        this._dirts.push(entity);
    };
    p.createSoldier = function (soldier) {
        var hero = soldier.relive(10000);
        hero.x = soldier.x;
        hero.y = soldier.y;
        this.addHero(hero);
        return hero;
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle',["SoldierCreator"]);
//# sourceMappingURL=Battle.js.map