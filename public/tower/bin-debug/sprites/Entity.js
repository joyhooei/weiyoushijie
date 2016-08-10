var EntityState;
(function (EntityState) {
    EntityState[EntityState["idle"] = 0] = "idle";
    EntityState[EntityState["building"] = 1] = "building";
    EntityState[EntityState["moving"] = 2] = "moving";
    EntityState[EntityState["guarding"] = 3] = "guarding";
    EntityState[EntityState["fighting"] = 4] = "fighting";
    EntityState[EntityState["dying"] = 5] = "dying";
    EntityState[EntityState["dead"] = 6] = "dead";
})(EntityState || (EntityState = {}));
;
var EntityDirection;
(function (EntityDirection) {
    EntityDirection[EntityDirection["north"] = 0] = "north";
    EntityDirection[EntityDirection["northeast"] = 1] = "northeast";
    EntityDirection[EntityDirection["east"] = 2] = "east";
    EntityDirection[EntityDirection["southeast"] = 3] = "southeast";
    EntityDirection[EntityDirection["south"] = 4] = "south";
    EntityDirection[EntityDirection["southwest"] = 5] = "southwest";
    EntityDirection[EntityDirection["west"] = 6] = "west";
    EntityDirection[EntityDirection["northwest"] = 7] = "northwest";
})(EntityDirection || (EntityDirection = {}));
;
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        _super.call(this);
    }
    var d = __define,c=Entity,p=c.prototype;
    /**初始化*/
    p.initialize = function (properties) {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state = this._get(properties, "state", EntityState.idle);
        this._ticks = 0;
        this._repaint = true;
    };
    p._get = function (properties, name, defaultVal) {
        if (properties && properties[name]) {
            return properties[name];
        }
        else {
            return defaultVal;
        }
    };
    p.dead = function () {
        return this._state == EntityState.dead;
    };
    p.dying = function () {
        return this._state == EntityState.dying;
    };
    p.select = function (again) {
    };
    p.deselect = function () {
    };
    /**更新状态*/
    p.update = function () {
        this._ticks++;
        switch (this._state) {
            case EntityState.idle:
                this._idle();
                break;
            case EntityState.building:
                this._building();
                break;
            case EntityState.moving:
                this._moving();
                break;
            case EntityState.guarding:
                this._guarding();
                break;
            case EntityState.fighting:
                this._fighting();
                break;
            case EntityState.dying:
                this._dying();
                break;
        }
        this._paint();
    };
    //根据状态、面向修改重新渲染
    p._paint = function () {
        if (this._repaint) {
            var mc = application.characters[egret.getQualifiedClassName(this)].getMC(this._direction, this._state);
            if (mc && mc != this._mc) {
                this.removeChild(this._mc);
                this._mc = mc;
                this.addChild(mc);
                mc.start();
            }
            this._repaint = false;
        }
    };
    p._do = function (state) {
        if (state != this._state) {
            this._stateChanged(this._state, state);
            this._ticks = 0;
            this._state = state;
            this._repaint = true;
        }
    };
    //转向
    p._turn = function (direction) {
        if (direction != this._direction) {
            this._direction = direction;
            this._repaint = true;
        }
    };
    p._stateChanged = function (oldState, newState) {
    };
    p._idle = function () {
    };
    p._building = function () {
    };
    p._moving = function () {
    };
    p._guarding = function () {
    };
    p._fighting = function () {
    };
    p._dying = function () {
    };
    p.intersect = function (x, y, radius) {
        var dx = this.x - x;
        var dy = this.y - y;
        return (dx * dx + dy * dy <= radius * radius);
    };
    p.collide = function (obj) {
        return !(obj.x > this.x + this.width ||
            obj.x + obj.width < this.x ||
            obj.y > this.y + this.height ||
            obj.y + obj.height < this.y);
    };
    p._direction8 = function (x, y) {
        var angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        var directions = [EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east];
        return this._directionOf(x, y, angels, directions);
    };
    p._direction4 = function (x, y) {
        var angels = [60, 120, 240, 300, 360];
        var directions = [EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east];
        return this._directionOf(x, y, angels, directions);
    };
    p._directionOf = function (x, y, angels, directions) {
        var dx = x - this.x;
        var dy = y - this.y;
        var angel = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        for (var i = 0; i < angels.length; i++) {
            if (angel <= angels[i]) {
                return directions[i];
            }
        }
    };
    return Entity;
}(egret.Sprite));
egret.registerClass(Entity,'Entity');
//# sourceMappingURL=Entity.js.map