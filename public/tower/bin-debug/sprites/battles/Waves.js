var Waves = (function () {
    function Waves(mapWidth, mapHeight) {
        this._mapWidth = mapWidth;
        this._mapHeight = mapHeight;
        this._running = false;
    }
    var d = __define,c=Waves,p=c.prototype;
    p.setPaths = function (paths) {
        this._paths = paths;
        this._enemies = [];
        this._currentWave = -1;
        this._rounds = 0;
        this._ticksBetweenWaves = 40 * application.frameRate;
        this._ticksBetweenQueues = 4 * application.frameRate;
        this._launchTicks = 0;
        this._tips = [];
    };
    p.getCurrentWave = function () {
        return this._rounds * this._enemies.length + this._currentWave;
    };
    p.add = function (wave, claz, count, path) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave][path] = this._enemies[wave][path] || [];
        this._enemies[wave][path].push(new Queue(claz, count));
    };
    p.launchFirstWave = function () {
        this._currentWave = 0;
        this._running = true;
        this.launchWave(this._currentWave);
    };
    p.launchWave = function (wave) {
        for (var i = 0; i < this._tips.length; i++) {
            this._tips[i].erase();
        }
        this._tips = [];
        this._launchTicks = 0;
        for (var p = 0; p < this._enemies[wave].length; p++) {
            var idleTicks = 0;
            if (this._enemies[wave][p]) {
                for (var q = 0; q < this._enemies[wave][p].length; q++) {
                    this._enemies[wave][p][q].launch(this._paths[p], idleTicks);
                    idleTicks += this._ticksBetweenQueues;
                }
                if (this._launchTicks < idleTicks) {
                    this._launchTicks = idleTicks;
                }
            }
        }
    };
    p.launch = function (cycle) {
        if (this._running) {
            //上一波还没有全部走出来
            this._launchTicks--;
            if (this._launchTicks != 0) {
                return false;
            }
            //检查是否有下一波游戏
            if (false == this._nextWave(cycle)) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    };
    p._addWaveTips = function (wave) {
        for (var p = 0; p < this._enemies[wave].length; p++) {
            if (this._enemies[wave][p]) {
                var tip = application.pool.get("LaunchTip", { dyingTicks: this._ticksBetweenWaves, wave: wave });
                var path = this._paths[p];
                var direction = Entity.direction4(path[0][0], path[0][1], path[1][0], path[1][1]);
                switch (direction) {
                    case EntityDirection.east:
                        tip.x = 20;
                        tip.y = path[0][1];
                        break;
                    case EntityDirection.west:
                        tip.x = this._mapWidth - tip.width - 20;
                        tip.y = path[0][1];
                        break;
                    case EntityDirection.north:
                        tip.x = path[0][0];
                        tip.y = this._mapHeight - tip.height - 20;
                        break;
                    case EntityDirection.south:
                        tip.x = path[0][0];
                        tip.y = 20;
                        break;
                }
                application.battle.addEntity(tip);
                this._tips.push(tip);
            }
        }
    };
    p._nextWave = function (cycle) {
        if (this._currentWave < this._enemies.length - 1) {
            this._currentWave++;
        }
        else {
            if (cycle) {
                this._currentWave = 0;
                this._rounds += 1;
            }
            else {
                this._running = false;
                return false;
            }
        }
        this._addWaveTips(this._currentWave);
        application.dao.dispatchEventWith("Battle", true, { waves: this.getCurrentWave() });
        return true;
    };
    return Waves;
}());
egret.registerClass(Waves,'Waves');
//# sourceMappingURL=Waves.js.map