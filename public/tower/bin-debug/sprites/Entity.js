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
        this._displays = new EntityDisplays();
    }
    var d = __define,c=Entity,p=c.prototype;
    p.initialize = function (properties) {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state = this._get(properties, "state", EntityState.idle);
        this._ticks = 0;
    };
    p._get = function (properties, name, defaultVal) {
        if (properties && properties[name]) {
            return properties[name];
        }
        else {
            return defaultVal;
        }
    };
    p.getClassName = function () {
        return egret.getQualifiedClassName(this);
    };
    p.getSuperClassName = function () {
        return egret.getQualifiedSuperclassName(this);
    };
    p.getMapX = function () {
        if (this.parent != application.battle) {
            return this.parent.getMapX() + this.x;
        }
        else {
            return this.x;
        }
    };
    p.getMapY = function () {
        if (this.parent != application.battle) {
            return this.parent.getMapY() + this.y;
        }
        else {
            return this.y;
        }
    };
    p.getCenterX = function () {
        return this.getMapX() + (this.width >> 1);
    };
    p.getCenterY = function () {
        return this.getMapY() + (this.height >> 1);
    };
    p.stain = function () {
        application.battle.addDirt(this);
    };
    p.build = function () {
        this._do(EntityState.building);
    };
    p.move = function () {
        this._do(EntityState.moving);
    };
    p.guard = function () {
        this._do(EntityState.guarding);
    };
    p.fight = function () {
        this._do(EntityState.fighting);
    };
    p.kill = function () {
        this._do(EntityState.dying);
    };
    p.erase = function () {
        this._do(EntityState.dead);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        application.pool.set(this);
    };
    p.active = function () {
        return this._state < EntityState.dying;
    };
    p.dead = function () {
        return this._state == EntityState.dead;
    };
    p.select = function (again) {
    };
    p.deselect = function () {
    };
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
        return this.dead();
    };
    //根据状态、面向修改重新渲染
    p.paint = function () {
        this._displays.render(this, { direction: this._direction, state: this._state });
    };
    p._do = function (state) {
        if (state != this._state) {
            //dead状态不需要再变更状态了
            //当前状态如果是dying，新状态只能是dead
            if (this._state == EntityState.dead || (this._state == EntityState.dying && state != EntityState.dead)) {
                return;
            }
            this._ticks = 0;
            this._state = state;
            this.stain();
        }
    };
    //转向
    p._turn = function (direction) {
        if (direction != this._direction) {
            this._direction = direction;
            this.stain();
        }
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
    p.within = function (x, y, radius) {
        if (Entity.intersect(this.x, this.y, this.width, this.height, x - radius, y - radius, radius + radius, radius + radius)) {
            var dx = this.x + this.width / 2 - x;
            var dy = this.y + this.height / 2 - y;
            return (dx * dx + dy * dy <= radius * radius);
        }
        else {
            return false;
        }
    };
    p.collide = function (entity) {
        return Entity.intersect(entity.x, entity.y, entity.width, entity.height, this.x, this.y, this.width, this.height);
    };
    Entity.intersect = function (x1, y1, width1, height1, x2, y2, width2, height2) {
        return !(x1 > x2 + width2 || x1 + width1 < x2 || y1 > y2 + height2 || y1 + height1 < y2);
    };
    p._direction8 = function (x, y) {
        var angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        var directions = [EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east];
        return Entity.direction(this.x, this.y, x, y, angels, directions);
    };
    p._direction4 = function (x, y) {
        return Entity.direction4(this.x, this.y, x, y);
    };
    Entity.direction4 = function (x1, y1, x2, y2) {
        var angels = [60, 120, 240, 300, 360];
        var directions = [EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east];
        return Entity.direction(x1, y1, x2, y2, angels, directions);
    };
    Entity.direction = function (x1, y1, x2, y2, angels, directions) {
        var dx = x2 - x1;
        var dy = y2 - y1;
var angel = Math.atan2(dy, dx) * 57.29578049044297; //180 / Math.PI;
        if (angel < 0) {
        	angel += 360;
        }
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
