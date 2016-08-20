var Waves = (function () {
    function Waves() {
        this._enemies = [];
        this._currentWave = 0;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
        this._rounds = 0;
    }
    var d = __define,c=Waves,p=c.prototype;
    p.add = function (wave, claz, count, paths) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave].push([count, claz, paths]);
    };
    p._randomPaths = function (paths) {
        var pathWidth = 60;
        var enemyInterval = 20;
        var deltaY = Math.random() * pathWidth - pathWidth / 2;
        var deltaX = Math.random() * pathWidth - pathWidth / 2;
        var newPaths = [];
        for (var j = 0; j < paths.length - 1; j++) {
            newPaths.push([paths[j][0] + deltaX, paths[j][1] + deltaY]);
        }
        var direction = Entity.direction4(paths[paths.length - 2][0], paths[paths.length - 2][1], paths[paths.length - 1][0], paths[paths.length - 1][1]);
        switch (direction) {
            case EntityDirection.east:
            case EntityDirection.west:
                deltaX = 0;
                break;
            case EntityDirection.north:
            case EntityDirection.south:
                deltaY = 0;
                break;
        }
        newPaths.push([paths[paths.length - 1][0] + deltaX, paths[paths.length - 1][1] + deltaY]);
        return newPaths;
    };
    p.launchNow = function (cycle) {
        var wave = this._enemies[this._currentWave];
        for (var i = 0; i < wave.length; i++) {
            var count = wave[i][0] * (1 + this._rounds * 0.5);
            var claz = wave[i][1];
            var paths = wave[i][2];
            for (var j = 0; j < count; j++) {
                var enemy = application.pool.get(claz, { "paths": this._randomPaths(paths) });
                application.battle.addEnemy(enemy);
            }
        }
        this._currentWave++;
        this._timeToNextWave = this._timeBetweenWaves;
    };
    p.launch = function (cycle) {
        if (this._nextWave(cycle)) {
            if (this._timeToNextWave <= 0) {
                this.launchNow(cycle);
            }
            else if (this._timeToNextWave == this._timeBetweenWaves) {
                var wave = this._enemies[this._currentWave];
                for (var i = 0; i < wave.length; i++) {
                    var paths = wave[i][2];
                    for (var j = 0; j < paths.length; j++) {
                        var tip = application.pool.get("LaunchTip", { "dyingTicks": this._timeBetweenWaves });
                        var direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
                        switch (direction) {
                            case EntityDirection.east:
                                tip.x = paths[0][0] + 50;
                                tip.y = paths[0][1];
                                break;
                            case EntityDirection.west:
                                tip.x = paths[0][0] - 50;
                                tip.y = paths[0][1];
                                break;
                            case EntityDirection.north:
                                tip.x = paths[0][0];
                                tip.y = paths[0][1] - 50;
                                break;
                            case EntityDirection.south:
                                tip.x = paths[0][0];
                                tip.y = paths[0][1] + 50;
                                break;
                        }
                        application.battle.addTip(tip);
                    }
                }
            }
            this._timeToNextWave--;
        }
    };
    p._nextWave = function (cycle) {
        if (this._currentWave >= this._enemies.length) {
            if (cycle) {
                this._currentWave = 0;
                this._rounds += 1;
            }
            else {
                application.battle.erase();
                return false;
            }
        }
        return true;
    };
    return Waves;
}());
egret.registerClass(Waves,'Waves');
//# sourceMappingURL=Waves.js.map