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
        this._map = new TiledMap();
    }
    var d = __define,c=Battle,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
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
        this._addHero();
    };
    p.enableSelect = function (obj) {
        obj.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
    };
    p._touch = function (e) {
        if (this._selectedObj == e.target) {
            e.target.select(true);
        }
        else {
            if (e.target == this) {
                var baseClassName = egret.getQualifiedSuperclassName(this._selectedObj);
                var x = Math.round(e.localX);
                var y = Math.round(e.localY);
                if (this._map.walkable(x, y)) {
                    if (baseClassName == "Hero") {
                        this._selectedObj.moveTo(x, y);
                    }
                }
                else {
                }
            }
            else {
                this._selectedObj.deselect();
                this._selectedObj = this;
                e.target.select(false);
            }
        }
    };
    p.incLives = function (lives) {
        this._lives += lives;
    };
    p._addLayer = function () {
        var layer = new egret.Sprite();
        this.addChild(layer);
        return layer;
    };
    p.loadResource = function (options) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            self._map.load(self._url, 800, 480).then(function () {
                resolve(self);
            }, function (error) {
                reject(error);
            });
        });
    };
    //增加英雄
    p._addHero = function () {
        var hero = this._map.getBaseGuardPosition();
        this._setHero(hero[0], hero[1], this._hero);
    };
    //增加塔基
    p._addBases = function () {
        var bases = this._map.getBasePositions();
        for (var i = 0; i < bases.length; i++) {
            var entity = application.pool.get("Base");
            this._addBase(bases[i][0], bases[i][1], entity);
        }
    };
    p._addWaveEnemy = function (wave, entrance, exit, className, options) {
        if (this._waves[wave]) {
            this._waves[wave] = [];
        }
        var group = 0;
        for (; group < this._waves[wave].length; group++) {
            var sbs = this._waves[wave][group];
            if (sbs && sbs.length > 0 && sbs[0][0] == entrance && sbs[0][1] == exit) {
                sbs.push([entrance, exit, className, options]);
                return;
            }
        }
        this._waves[wave][group] = [[entrance, exit, className, options]];
    };
    //发动一波攻击
    p._launch = function (wave) {
        var groups = this._waves[wave];
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var path = this._map.getEnemyPath(group[0][0], group[0][1]);
            for (var j = 0; j < group.length; j++) {
                var sb = group[j];
                var enemy = (Enemy), application_1, pool = void 0, get = (sb[2]);
                var options = sb[3];
                options.path = path;
                enemy.initialize(options);
                this.addEnemy(path[0][0], path[0][1], enemy);
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
    p.update = function () {
        if (this._enemies.length == 0) {
            this._launchNextWave();
        }
        this._hero.update();
        this._updateLayer(this._towers, this._objLayer);
        this._updateLayer(this._soliders, this._objLayer);
        this._updateLayer(this._enemies, this._objLayer);
        this._updateLayer(this._bullets, this._bulletLayer);
        this._updateLayer(this._cartridges, this._bulletLayer);
    };
    p._launchNextWave = function () {
        this._timeToNextWave--;
        if (this._timeToNextWave <= 0) {
            this.launch(this._currentWave);
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
    p.findEnemy = function (x, y, radius) {
        var enemy = null;
        for (var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i].intersect(x, y, radius)) {
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
    p.addSoliders = function (x, y, soliders) {
        for (var i = 0; i < soliders.length; i++) {
            this._soliders.push(soliders[i]);
            this._addObj(x, y, soliders[i], this._objLayer);
        }
    };
    p.addEnemy = function (x, y, enemy) {
        this._enemies.push(enemy);
        this._addObj(x, y, enemy, this._objLayer);
    };
    p.addBullets = function (x, y, bullet) {
        this._bullets.push(bullet);
        this._addObj(x, y, bullet, this._bulletLayer);
    };
    p.addCartridges = function (x, y, cartridges) {
        for (var i = 0; i < cartridges.length; i++) {
            this._cartridges.push(cartridges[i]);
            this._addObj(x, y, cartridges[i], this._bulletLayer);
        }
    };
    p.addTower = function (x, y, tower) {
        this._towers.push(tower);
        this._addObj(x, y, tower, this._objLayer);
    };
    p._addBase = function (x, y, base) {
        this._bases.push(base);
        this._addObj(x, y, base, this._baseLayer);
    };
    p._setHero = function (x, y, hero) {
        this._hero = hero;
        this._addObj(x, y, hero, this._objLayer);
    };
    p._addObj = function (x, y, obj, layer) {
        obj.x = x;
        obj.y = y;
        layer.addChild(obj);
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle');
//# sourceMappingURL=Battle.js.map