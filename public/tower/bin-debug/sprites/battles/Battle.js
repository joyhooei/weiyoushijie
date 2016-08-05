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
        this.addBases();
    }
    var d = __define,c=Battle,p=c.prototype;
    p.enableSelect = function (obj) {
        obj.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
    };
    p._touch = function (e) {
        if (this._selectedObj == e.target) {
            e.target.select(true);
        }
        else {
            this._selectedObj.deselect();
            this._selectedObj = this;
            e.target.select(false);
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
        });
    };
    p.initialize = function (options) {
        this._areaLayer.removeChildren();
        this._objLayer.removeChildren();
        this._bulletLayer.removeChildren();
        this._toolLayer.removeChildren();
        this._currentWave = 1;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
        this._towers = [];
        this._soliders = [];
        this._bullets = [];
        this._enemies = [];
        this._cartridges = [];
        this.addHero();
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
        this._update(this._towers, this._objLayer);
        this._update(this._soliders, this._objLayer);
        this._update(this._enemies, this._objLayer);
        this._update(this._bullets, this._bulletLayer);
        this._update(this._cartridges, this._bulletLayer);
    };
    p._launchNextWave = function () {
        this._timeToNextWave--;
        if (this._timeToNextWave <= 0) {
            this.launch(this._currentWave);
            this._currentWave++;
            this._timeToNextWave = this._timeBetweenWaves;
        }
    };
    p._update = function (objs, layer) {
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
    p.addEnemies = function (x, y, enemies) {
        for (var i = 0; i < enemies.length; i++) {
            this._enemies.push(enemies[i]);
            this._addObj(x, y, enemies[i], this._objLayer);
        }
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
    p._queue = function (x, y, direction, objs) {
        var width = objs[0].width + 2;
        var height = objs[0].height + 2;
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            if (i % 3 == 0) {
                obj.y = y - height;
            }
            else if (i % 3 == 1) {
                obj.y = y + height;
            }
            else {
                if (direction == EntityDirection.east) {
                    x -= width;
                }
                else {
                    x += width;
                }
            }
            obj.x = x;
        }
        return objs;
    };
    return Battle;
}(Entity));
egret.registerClass(Battle,'Battle');
