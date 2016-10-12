var Queue = (function () {
    function Queue(claz, count) {
        this._claz = claz;
        this._count = count;
    }
    var d = __define,c=Queue,p=c.prototype;
    p.launch = function (path, idleTicks) {
        for (var j = 0; j < this._count; j++) {
            var enemy = application.pool.get(this._claz, { "paths": this._randomPath(path), idleTicks: idleTicks + Math.random() * (application.frameRate << 2) });
            application.battle.addEnemy(enemy);
        }
    };
    p._randomPath = function (path) {
        var pathWidth = 30;
        var enemyInterval = 20;
        var entityWidth = 30;
        var deltaY = Math.random() * pathWidth - pathWidth / 2;
        var deltaX = Math.random() * pathWidth - pathWidth / 2;
        var newPath = [];
        var direction = Entity.direction4(path[0][0], path[0][1], path[1][0], path[1][1]);
        switch (direction) {
            case EntityDirection.east:
                newPath.push([-entityWidth, path[0][1] + deltaY]);
                break;
            case EntityDirection.west:
                newPath.push([800 + entityWidth, path[0][1] + deltaY]);
                break;
            case EntityDirection.south:
                newPath.push([path[0][0] + deltaX, -entityWidth]);
                break;
            case EntityDirection.north:
                newPath.push([path[0][0] + deltaX, 480 + entityWidth]);
                break;
        }
        for (var j = 1; j < path.length - 1; j++) {
            newPath.push([path[j][0] + deltaX, path[j][1] + deltaY]);
        }
        direction = Entity.direction4(path[path.length - 2][0], path[path.length - 2][1], path[path.length - 1][0], path[path.length - 1][1]);
        switch (direction) {
            case EntityDirection.east:
                newPath.push([800, path[path.length - 1][1] + deltaY]);
                break;
            case EntityDirection.west:
                newPath.push([0, path[path.length - 1][1] + deltaY]);
                break;
            case EntityDirection.north:
                newPath.push([path[path.length - 1][0] + deltaX, 0]);
                break;
            case EntityDirection.south:
                newPath.push([path[path.length - 1][0] + deltaX, 480]);
                break;
        }
        return newPath;
    };
    return Queue;
}());
egret.registerClass(Queue,'Queue');
//# sourceMappingURL=Queue.js.map