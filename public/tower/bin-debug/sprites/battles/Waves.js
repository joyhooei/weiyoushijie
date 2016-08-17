var Waves = (function () {
    function Waves() {
        this._enemies = [];
        this._currentWave = 0;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
    }
    var d = __define,c=Waves,p=c.prototype;
    p.add = function (wave, className, count, paths) {
        this._enemies[wave] = this._enemies[wave] || [];
        for (var i = 0; i < count; i++) {
            this._enemies[wave].push(application.pool.get(className, { "paths": this._randomPaths(paths) }));
        }
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
    p.erase = function () {
        for (var i = 0; i < this._enemies.length; i++) {
            for (var j = 0; j < this._enemies[i].length; j++) {
                this._enemies[i][j].erase();
            }
        }
    };
    p.launch = function () {
        if (this._currentWave >= this._enemies.length) {
            application.battle.kill();
        }
        else {
            this._timeToNextWave--;
            if (this._timeToNextWave <= 0) {
                for (var i = 0; i < this._enemies[this._currentWave].length; i++) {
                    application.battle.addEnemy(this._enemies[this._currentWave][i]);
                }
                this._enemies[this._currentWave] = [];
                this._currentWave++;
                this._timeToNextWave = this._timeBetweenWaves;
            }
        }
    };
    return Waves;
}());
egret.registerClass(Waves,'Waves');
//# sourceMappingURL=Waves.js.map