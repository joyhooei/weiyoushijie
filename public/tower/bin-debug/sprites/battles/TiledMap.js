var TiledMap = (function (_super) {
    __extends(TiledMap, _super);
    function TiledMap(map) {
        _super.call(this);
        this._map = map;
        this._parse();
    }
    var d = __define,c=TiledMap,p=c.prototype;
    p.paint = function () {
        this.addChild(this._map);
        this._map.render();
    };
    TiledMap.load = function (url, width, height) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            var urlLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                var data = egret.XML.parse(event.target.data);
                var tmxTileMap = new tiled.TMXTilemap(width, height, data, url);
                tmxTileMap.once(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, function () {
                    Utility.delay(function () {
                        resolve(new TiledMap(tmxTileMap));
                    }, 100);
                }, this, true, 0);
                tmxTileMap.getObjects();
            }, url);
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                reject('加载地图失败');
            }, this);
            urlLoader.load(new egret.URLRequest(url));
        });
    };
    p._xP2L = function (x) {
        return Math.round(x / this._tileWidth);
    };
    p._yP2L = function (y) {
        return Math.round(y / this._tileHeight);
    };
    p._markGrid = function () {
        this._grid = [];
        for (var i = 0; i <= this._width; i++) {
            this._grid[i] = [];
            for (var j = 0; j <= this._height; j++) {
                this._grid[i][j] = 0;
            }
        }
        for (var j = 0; j < this._paths.length; j++) {
            var path = this._paths[j];
            for (var i = 0; i < path.length - 1; i++) {
                var xFrom = this._xP2L(path[i][0]);
                var yFrom = this._yP2L(path[i][1]);
                var xTo = this._xP2L(path[i + 1][0]);
                var yTo = this._yP2L(path[i + 1][1]);
                if (xFrom > xTo) {
                    var temp = xFrom;
                    xFrom = xTo;
                    xTo = temp;
                }
                if (yFrom > yTo) {
                    var temp = yFrom;
                    yFrom = yTo;
                    yTo = temp;
                }
                for (var k = xFrom; k <= xTo; k++) {
                    for (var j_1 = yFrom; j_1 <= yTo; j_1++) {
                        this._markArea(k, j_1, 1, 1);
                    }
                }
            }
        }
        console.log(JSON.stringify(this._grid));
    };
    p._markArea = function (x, y, delta, value) {
        for (var i = x - delta; i <= x + delta; i++) {
            for (var j = y - delta; j <= y + delta; j++) {
                if ((this._grid[i][j] != value) && !this._outOfBounds(i, j)) {
                    this._grid[i][j] = value;
                }
            }
        }
    };
    p._parse = function () {
        this._tileWidth = this._map.tilewidth;
        this._tileHeight = this._map.tileheight;
        this._width = this._map.width / this._tileWidth;
        this._height = this._map.height / this._tileHeight;
        this._paths = [];
        this._bases = [];
        this._heros = [];
        this._entrances = [];
        this._exits = [];
        var ogs = this._map.getObjects();
        for (var i = 0; i < ogs.length; i++) {
            var og = ogs[i];
            var name_1 = og.name;
            var arrayOfStrings = name_1.split("-");
            if (arrayOfStrings[0] == 'path') {
                this._paths.push(this._parsePath(og));
            }
            else if (arrayOfStrings[0] == 'base') {
                this._bases = this._parseBases(og);
            }
            else if (arrayOfStrings[0] == 'hero') {
                this._heros = this._parseHeros(og);
            }
        }
        this._markGrid();
    };
    p._parsePath = function (og) {
        var path = [];
        for (var i = 0; i < og.getObjectCount(); i++) {
            var o = og.getObjectByIndex(i);
            var name_2 = o.name;
            var pos = [o.x, o.y];
            var arrayOfStrings = name_2.split("-");
            if (arrayOfStrings[0] == 'start') {
                path[0] = pos;
                if (!this._exists(this._entrances, pos)) {
                    this._entrances.push(pos);
                }
            }
            else if (arrayOfStrings[0] == 'end') {
                path[og.getObjectCount() - 1] = pos;
                if (!this._exists(this._exits, pos)) {
                    this._exits.push(pos);
                }
            }
            else {
                if (arrayOfStrings.length == 2 && arrayOfStrings[0] == 'waypoint') {
                    var idx = +arrayOfStrings[1];
                    path[idx + 1] = pos;
                }
            }
        }
        return path;
    };
    p._exists = function (path, pos) {
        for (var i = 0; i < path.length; i++) {
            if (path[i][0] == pos[0] && path[i][1] == pos[1]) {
                return true;
            }
        }
        return false;
    };
    p._parseBases = function (og) {
        var bases = [];
        for (var i = 0; i < og.getObjectCount(); i++) {
            var o = og.getObjectByIndex(i);
            var name_3 = o.name;
            var arrayOfStrings = name_3.split("-");
            if (arrayOfStrings.length == 2 && arrayOfStrings[0] == 'base' || arrayOfStrings[0] == 'guarder') {
                var idx = +arrayOfStrings[1];
                if (!bases[idx]) {
                    bases[idx] = [];
                }
                if (arrayOfStrings[0] == 'base') {
                    bases[idx][0] = o.x;
                    bases[idx][1] = o.y;
                }
                else {
                    bases[idx][2] = o.x;
                    bases[idx][3] = o.y;
                }
            }
        }
        return bases;
    };
    p._parseHeros = function (og) {
        var heros = [];
        var warriors = 0;
        for (var i = 0; i < og.getObjectCount(); i++) {
            var o = og.getObjectByIndex(i);
            var name_4 = o.name;
            var arrayOfStrings = name_4.split("-");
            heros[0] = heros[0] || [];
            if (arrayOfStrings[0] == 'start') {
                heros[0][0] = [o.x, o.y];
            }
            else if (arrayOfStrings[0] == 'warriors') {
                warriors++;
                heros[0][warriors] = [o.x, o.y];
            }
        }
        return heros;
    };
    p.walkable = function (x, y) {
        x = this._xP2L(x);
        y = this._yP2L(y);
        return (!this._outOfBounds(x, y) && (this._grid[x][y] == 1));
    };
    p._outOfBounds = function (x, y) {
        return !(x >= 0 && x <= this._width && y >= 0 && y <= this._height);
    };
    p.getBases = function () {
        return this._bases;
    };
    p.getHeros = function () {
        return this._heros;
    };
    p.getPaths = function () {
        return this._paths;
    };
    p.getEntrances = function () {
        return this._entrances;
    };
    p.getExits = function () {
        return this._exits;
    };
    return TiledMap;
}(egret.Sprite));
egret.registerClass(TiledMap,'TiledMap');
//# sourceMappingURL=TiledMap.js.map