var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
        //地基层
        this._baseLayer = this._addLayer();
        //怪物层、士兵层、英雄层
        this._objLayer = this._addLayer();
        //子弹层
        this._bulletLayer = this._addLayer();
        //工具层
        this._toolLayer = this._addLayer();
        this._waves = new Waves();
        this._bases = [];
        this._heros = [];
        this.enableSelect(this);
    }
    var d = __define,c=Battle,p=c.prototype;
    p.loadResource = function (options) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            TiledMap.load(self._url, 800, 480).then(function (map) {
                self._map = map;
                self.addChildAt(self._map, 0);
                self._map.paint();
                self._addBases();
                self._addHeros();
                self._addStandbys();
                resolve(self);
            }, function (error) {
                reject(error);
            });
        });
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._lives = this._get(properties, "lives", 20);
        this._golds = this._get(properties, "golds", 1000);
        this._baseLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();
        this._soldiers = [];
        this._bullets = [];
        this._enemies = [];
        this._dirts = [];
    };
    p.enableSelect = function (entity) {
        entity.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
    };
    p.readyUseTool = function (toolItem) {
        this._toolItem = toolItem;
    };
    p._touch = function (e) {
        if (this._focus == e.target) {
            e.target.select(true);
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
                        if (baseClassName == "Hero") {
                            this._focus.moveTo(x, y);
                        }
                        this._focus = null;
                    }
                }
                else {
                    //显示不能放置图片
                    var tip = application.pool.get("NotMoveableTip");
                    tip.x = x;
                    tip.y = y;
                    this.addTip(tip);
                }
            }
            else {
                this._focus.deselect();
                this._focus = this;
                e.target.select(false);
            }
        }
    };
    p.incLives = function (lives) {
        this._lives += lives;
        if (this._lives <= 0) {
            this.kill();
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
        var bases = this._map.getBases();
        for (var i = 0; i < bases.length; i++) {
            var base = application.pool.get("Base", { "guardX": bases[i][2], "guardY": bases[i][3] });
            base.x = bases[i][0];
            base.y = bases[i][1];
            this.addBase(base);
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
    p.kill = function () {
        _super.prototype.kill.call(this);
        this._eraseEntities(this._heros);
        this._eraseEntities(this._bases);
        this._eraseEntities(this._soldiers);
        this._eraseEntities(this._enemies);
        this._eraseEntities(this._bullets);
        this._waves.erase();
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
    p.update = function () {
        if (this._enemies.length == 0) {
            this._waves.launch();
        }
        if (this._ticks % 2 == 0) {
            this._updateEntities(this._heros);
            this._updateEntities(this._bases);
            this._updateEntities(this._soldiers);
            this._updateEntities(this._enemies);
        }
        else {
            this._updateEntities(this._bullets);
        }
        return !this.active();
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
    p.addBullet = function (bullet) {
        this._bullets.push(bullet);
        this._bulletLayer.addChild(bullet);
    };
    p.addBase = function (base) {
        this._bases.push(base);
        this._baseLayer.addChild(base);
    };
    p.addHero = function (hero) {
        this._heros.push(hero);
        this._objLayer.addChild(hero);
    };
    p.addTip = function (tip) {
        this._bulletLayer.addChild(tip);
    };
    p.addDirt = function (entity) {
        this._dirts.push(entity);
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle');
//# sourceMappingURL=Battle.js.map