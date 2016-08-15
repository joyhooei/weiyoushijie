var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
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
    var d = __define,c=Battle,p=c.prototype;
    p.loadResource = function (options) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            TiledMap.load(self._url, 800, 480).then(function (map) {
                self._map = map;
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
        this._areaLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();
        this._currentWave = 1;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
        this._bases = [];
        this._soliders = [];
        this._bullets = [];
        this._enemies = [];
        this._addBases();
        this._addHeros();
        this._addStandbys();
    };
    p.enableSelect = function (obj) {
        obj.touchEnabled = true;
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
    };
    p.incGolds = function (golds) {
        this._golds += golds;
    };
    p._addLayer = function () {
        var layer = new egret.Sprite();
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
    p._addWaveStandbys = function (wave, className, count, paths) {
        this._waves[wave] = this._waves[wave] || [];
        for (var i = 0; i < count; i++) {
            var enemy = application.pool.get(className, { "paths": paths });
            this._waves[wave].push(enemy);
        }
    };
    //发动一波攻击
    p._launch = function (wave) {
        for (var i = 0; i < this._waves[wave].length; i++) {
            var enemy = this._waves[wave][i];
            this.addEnemy(enemy);
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
    p.update = function () {
        if (this._enemies.length == 0) {
            this._launchNextWave();
        }
        for (var i = 0; i < this._heros.length; i++) {
            this._heros[i].update();
        }
        this._updateLayer(this._bases, this._objLayer);
        this._updateLayer(this._soliders, this._objLayer);
        this._updateLayer(this._enemies, this._objLayer);
        this._updateLayer(this._bullets, this._bulletLayer);
    };
    p._launchNextWave = function () {
        this._timeToNextWave--;
        if (this._timeToNextWave <= 0) {
            this._launch(this._currentWave);
            this._currentWave++;
            this._timeToNextWave = this._timeBetweenWaves;
        }
    };
    p._updateLayer = function (objs, layer) {
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            obj.update();
            if (obj.dead()) {
                objs.splice(i, 1);
                layer.removeChild(obj);
                application.pool.set(obj);
            }
        }
    };
    p.findEnemies = function (x, y, radius, altitudes) {
        var enemies = [];
        for (var i = 0; i < this._enemies.length; i++) {
            if ((this._enemies[i].getAltitude() in altitudes) && this._enemies[i].intersect(x, y, radius)) {
                enemies.push(this._enemies[i]);
            }
        }
        return enemies;
    };
    p.findEnemy = function (x, y, radius, altitudes) {
        for (var i = 0; i < this._enemies.length; i++) {
            if ((this._enemies[i].getAltitude() in altitudes) && this._enemies[i].intersect(x, y, radius)) {
                return this._enemies[i];
            }
        }
        return null;
    };
    p.findSuitableEnemy = function (x, y, radius, altitudes) {
        var enemy = null;
        for (var i = 0; i < this._enemies.length; i++) {
            if ((this._enemies[i].getAltitude() in altitudes) && this._enemies[i].intersect(x, y, radius)) {
                if (this._enemies[i].totalSoliders() == 0) {
                    return this._enemies[i];
                }
                else {
                    if (!(enemy && enemy.totalSoliders() < this._enemies[i].totalSoliders)) {
                        enemy = this._enemies[i];
                    }
                }
            }
        }
        return enemy;
    };
    p.addSolider = function (solider) {
        this._soliders.push(solider);
        this._objLayer.addChild(solider);
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
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle');
//# sourceMappingURL=Battle.js.map