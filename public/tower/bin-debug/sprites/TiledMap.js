var TileType;
(function (TileType) {
    TileType[TileType["wall"] = 0] = "wall";
    TileType[TileType["path"] = 1] = "path";
    TileType[TileType["base"] = 2] = "base";
    TileType[TileType["solider"] = 3] = "solider";
    TileType[TileType["hero"] = 4] = "hero";
    TileType[TileType["entrance"] = 5] = "entrance";
    TileType[TileType["exit"] = 6] = "exit";
})(TileType || (TileType = {}));
var TiledMap = (function (_super) {
    __extends(TiledMap, _super);
    function TiledMap(map, entrance, exit, path, base, solider, hero) {
        _super.call(this);
        this._map = map;
        this._entranceTileId = entrance;
        this._exitTileId = exit;
        this._pathTileId = path;
        this._baseTileId = base;
        this._soliderTileId = solider;
        this._heroTileId = hero;
        this._parse(map);
        this.addChild(map);
    }
    var d = __define,c=TiledMap,p=c.prototype;
    TiledMap.load = function (url, width, height) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            var urlLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                var data = egret.XML.parse(event.target.data);
                var tmxTileMap = new tiled.TMXTilemap(width, height, data, url);
                tmxTileMap.render();
                resolve(tmxTileMap);
            }, url);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                reject('加载地图失败');
            }, this);
            urlLoader.load(new egret.URLRequest(url));
        });
    };
    p._parse = function (tmxTileMap) {
        this._grid = [];
        this._tileWidth = tmxTileMap.tilewidth();
        this._tileHeight = tmxTileMap.tileheight();
        var layers = this.getLayers();
        var pathLayer = layers[1];
        for (var i = 0; i < pathLayer.rows(); i++) {
            for (var j = 0; j < pathLayer.cols(); j++) {
                var tileId = pathLayer.getTileId(i, j);
                if (tileId == this._entranceTileId) {
                    this._grid[i][j] = TileType.entrance;
                }
                else if (tileId == this._exitTileId) {
                    this._grid[i][j] = TileType.exit;
                }
                else if (tileId == this._pathId) {
                    this._grid[i][j] = TileType.path;
                }
                else {
                    this._grid[i][j] = TileType.wall;
                }
            }
        }
        var baseLayer = layers[2];
        for (var i = 0; i < baseLayer.rows(); i++) {
            for (var j = 0; j < baseLayer.cols(); j++) {
                var tileId = baseLayer.getTileId(i, j);
                if (tileId == this._baseTileId) {
                    this._grid[i][j] = TileType.base;
                }
                else if (tileId == this._soliderTileId) {
                    this._grid[i][j] = TileType.solider;
                }
                else if (tileId == this._heroTileID) {
                    this._grid[i][j] = TileType.hero;
                }
            }
        }
    };
    p.movable = function (x, y) {
        x = Math.round(x / this._tileWidth);
        y = Math.round(y / this._tileHeight);
        return (x < this._grid.length && y < this._grid[x].length
            && (this._grid[x][y] == TileType.path || this._grid[x][y] == TileType.solider || this._grid[x][y] == TileType.hero));
    };
    p.getBasePositions = function () {
        return this._getPositionsByType(TileType.base);
    };
    p.getBaseGuardPosition = function (x, y) {
        return this._getPositionsByType(TileType.solider);
    };
    p.getHeroGuardPositions = function () {
        return this._getPositionsByType(TileType.hero);
    };
    p.getEnemyEntrances = function () {
        return this._getPositionsByType(TileType.entrance);
    };
    p.getEnemyExits = function () {
        return this._getPositionsByType(TileType.exit);
    };
    p.getEnemyPaths = function () {
        var paths = number[][][];
        var entrances = this.getEnemyEntrances();
        var exits = this.getEnemyExits();
        for (var i = 0; i < entrances.length; i++) {
            for (var j = 0; j < exits.length; )
                : j++;
            {
                var path = this._getEnemyPath(entrances[i], exits[j]);
                if (path && path.length > 0) {
                    paths.push([path[0] * this._tileWidth, path[1] * this._tileHeight]);
                }
            }
        }
        return paths;
    };
    p._getEnemyPath = function (entrance, exit) {
        var graph = new Graph(this._grid, { diagonal: true });
        var start = graph.grid[entrance[0]][entrance[1]];
        var end = graph.grid[exit[0]][exit[1]];
        return astar.search(graph, start, end, { heuristic: astar.heuristics.diagonal });
    };
    p._getPositionsByType = function (type) {
        var positions = [][];
        for (var i = 0; i < this._grid.length; i++) {
            for (var j = 0; j < this._grid[i].length; j++) {
                if (this._grid[i][j] == type) {
                    positions.push([i * this._tileWidth, j * this._tileHeight]);
                }
            }
        }
        return positions;
    };
    return TiledMap;
}(Entity));
egret.registerClass(TiledMap,'TiledMap');
//# sourceMappingURL=TiledMap.js.map