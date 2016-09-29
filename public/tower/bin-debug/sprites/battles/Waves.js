var Waves = (function () {
    function Waves(mapWidth, mapHeight) {
        this._enemies = [];
        this._currentWave = -1;
        this._timeBetweenWaves = 10 * application.frameRate;
        this._rounds = 0;
        this._launching = false;
        this._mapWidth = mapWidth;
        this._mapHeight = mapHeight;
    }
    var d = __define,c=Waves,p=c.prototype;
    p.getCurrentWave = function () {
        return this._rounds * this._enemies.length + this._currentWave;
    };
    p.add = function (wave, claz, count, paths) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave].push([count, claz, paths, 0]);
    };
    p._randomPaths = function (paths) {
        var pathWidth = 30;
        var enemyInterval = 20;
        var entityWidth = 30;
        var deltaY = Math.random() * pathWidth - pathWidth / 2;
        var deltaX = Math.random() * pathWidth - pathWidth / 2;
        var newPaths = [];
        var direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
        switch (direction) {
            case EntityDirection.east:
                newPaths.push([-entityWidth, paths[0][1] + deltaY]);
                break;
            case EntityDirection.west:
                newPaths.push([this._mapWidth + entityWidth, paths[0][1] + deltaY]);
                break;
            case EntityDirection.south:
                newPaths.push([paths[0][0] + deltaX, -entityWidth]);
                break;
            case EntityDirection.north:
                newPaths.push([paths[0][0] + deltaX, this._mapHeight + entityWidth]);
                break;
        }
        for (var j = 1; j < paths.length - 1; j++) {
            newPaths.push([paths[j][0] + deltaX, paths[j][1] + deltaY]);
        }
        direction = Entity.direction4(paths[paths.length - 2][0], paths[paths.length - 2][1], paths[paths.length - 1][0], paths[paths.length - 1][1]);
        switch (direction) {
            case EntityDirection.east:
                newPaths.push([this._mapWidth, paths[paths.length - 1][1] + deltaY]);
                break;
            case EntityDirection.west:
                newPaths.push([0, paths[paths.length - 1][1] + deltaY]);
                break;
            case EntityDirection.north:
                newPaths.push([paths[paths.length - 1][0] + deltaX, 0]);
                break;
            case EntityDirection.south:
                newPaths.push([paths[paths.length - 1][0] + deltaX, this._mapHeight]);
                break;
        }
        return newPaths;
    };
    p.launchQueue = function (w, queue) {
        var wave = this._enemies[w];
        if (wave[queue][3] == 1) {
            return;
        }
        var count = wave[queue][0] * (1 + this._rounds * 0.5);
        var claz = wave[queue][1];
        var paths = wave[queue][2];
        for (var j = 0; j < count; j++) {
            var enemy = application.pool.get(claz, { "paths": this._randomPaths(paths) });
            application.battle.addEnemy(enemy);
        }
        wave[queue][3] = 1;
        this._launching = false;
    };
    p.launch = function (cycle) {
        if (this._launching || !this._nextWave(cycle)) {
            return;
        }
        this._launching = true;
        var wave = this._enemies[this._currentWave];
        for (var i = 0; i < wave.length; i++) {
            var paths = wave[i][2];
            var tip = application.pool.get("LaunchTip", { dyingTicks: this._timeBetweenWaves, queue: i, wave: this._currentWave });
            var direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
            switch (direction) {
                case EntityDirection.east:
                    tip.x = 20;
                    tip.y = paths[0][1];
                    break;
                case EntityDirection.west:
                    tip.x = this._mapWidth - tip.width - 20;
                    tip.y = paths[0][1];
                    break;
                case EntityDirection.north:
                    tip.x = paths[0][0];
                    tip.y = this._mapHeight - tip.height - 20;
                    break;
                case EntityDirection.south:
                    tip.x = paths[0][0];
                    tip.y = 20;
                    break;
            }
            application.battle.addEntity(tip);
        }
    };
    p._nextWave = function (cycle) {
        if (this._currentWave < this._enemies.length) {
            this._currentWave++;
        }
        else {
            if (cycle) {
                this._currentWave = 0;
                this._rounds += 1;
                for (var w = 0; w < this._enemies.length; w++) {
                    for (var q = 0; q < this._enemies[w].length; q++) {
                        this._enemies[w][q][3] = 0;
                    }
                }
            }
            else {
                application.battle.win();
                return false;
            }
        }
        application.dao.dispatchEventWith("Battle", true, { waves: this.getCurrentWave() });
        return true;
    };
    return Waves;
}());
egret.registerClass(Waves,'Waves');
//# sourceMappingURL=Waves.js.map