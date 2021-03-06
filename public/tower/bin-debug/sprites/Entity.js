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
        this._displaySprite = new egret.Sprite();
        this.addChild(this._displaySprite);
        this._sounds = new EntitySounds();
    }
    var d = __define,c=Entity,p=c.prototype;
    p.initialize = function (properties) {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state = this._get(properties, "state", EntityState.idle);
        this._ticks = 0;
        this._displaySprite.removeChildren();
        this._clip = null;
        this._clipPlaying = false;
    };
    p._get = function (properties, name, defaultVal) {
        if (properties && properties[name]) {
            return properties[name];
        }
        else {
            return defaultVal;
        }
    };
    p.getClaz = function () {
        return egret.getQualifiedClassName(this);
    };
    p.getSuperClaz = function () {
        return egret.getQualifiedSuperclassName(this);
    };
    p.setCenterX = function (x) {
        this.x = x - (this.width >> 1);
    };
    p.setCenterY = function (y) {
        this.y = y - (this.height >> 1);
    };
    p.getCenterX = function () {
        return this.x + (this.width >> 1);
    };
    p.getCenterY = function () {
        return this.y + (this.height >> 1);
    };
    p.setBottomY = function (y) {
        this.y = y - this.height;
    };
    p.getBottomY = function () {
        return this.y + this.height;
    };
    p.stain = function () {
        //application.battle.addDirt(this);
        this.paint();
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
        if (this._state > EntityState.idle && this._state < EntityState.dead) {
            var display = this._render();
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                this._clip = display;
                this._play();
            }
            else {
                this._act();
            }
        }
        else {
            if (this._clip) {
                this._clip.stop();
                this._clip.removeEventListener(egret.Event.COMPLETE, this._playCompleted, this);
            }
            this._displaySprite.removeChildren();
            this._clip = null;
            this._clipPlaying = false;
        }
    };
    p.addBitmap = function (name, action) {
        var bm = this._displays.addBitmap(name, action);
        if (bm && bm.width > 0 && bm.height > 0) {
            this.width = bm.width;
            this.height = bm.height;
        }
        return this;
    };
    p.addClip = function (name, action) {
        var clip = this._displays.addClip(name, action);
        if (clip && clip.width > 0 && clip.height > 0) {
            this.width = clip.width;
            this.height = clip.height;
        }
        return this;
    };
    p._play = function () {
        if (this._clip) {
            this._clip.addEventListener(egret.Event.COMPLETE, this._playCompleted, this);
            this._clipPlaying = true;
            this._clip.gotoAndPlay(0, 1);
        }
    };
    p._playCompleted = function () {
        if (this._act()) {
            this._clipPlaying = true;
            this._clip.gotoAndPlay(0, 1);
        }
        else {
            this._clipPlaying = false;
            if (this._clip) {
                this._clip.removeEventListener(egret.Event.COMPLETE, this._playCompleted, this);
            }
        }
    };
    p._render = function (xDelta, yDelta, idx) {
        if (xDelta === void 0) { xDelta = 0; }
        if (yDelta === void 0) { yDelta = 0; }
        if (idx === void 0) { idx = 0; }
        var display = this._displays.getDisplay(this._direction, this._state, idx);
        if (display) {
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                //动画的中点是（0， 0）
                this._displaySprite.x = (display.width >> 1) + xDelta;
                this._displaySprite.y = (display.height >> 1) + yDelta;
            }
            else {
                //图片的左边顶点是（0， 0）
                this._displaySprite.x = xDelta;
                this._displaySprite.y = yDelta;
            }
            //更换图片后，需要和上次图片的中点保持一致
            if (this.width != display.width) {
                this.x -= (display.width - this.width) >> 1;
                this.y -= (display.height - this.height) >> 1;
            }
            this.width = display.width;
            this.height = display.height;
            this._displaySprite.removeChildren();
            display.x = display.y = 0;
            this._displaySprite.addChild(display);
        }
        else {
            console.error("display dosn't exist for " + this.getClaz() + " direction = " + Entity.directionName(this._direction) + " state = " + Entity.stateName(this._state));
        }
        return display;
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
            this._sounds.play(this._state);
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
    //执行具体的动作，返回值true表示继续播放下一个动作
    p._act = function () {
        return true;
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
            var dx = this.getCenterX() - x;
            var dy = this.getBottomY() - y;
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
    p._directionAt = function (x, y) {
        return Entity.direction8(this.x, this.y, x, y);
    };
    Entity.random = function (low, high) {
        return Math.random() * (high - low) + low;
    };
    Entity.direction4 = function (x1, y1, x2, y2) {
        return Entity.direction(x1, y1, x2, y2, [45, 135, 225, 315, 360], [EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east]);
    };
    Entity.direction8 = function (x1, y1, x2, y2) {
        return Entity.direction(x1, y1, x2, y2, [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360], [EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east]);
    };
    Entity.direction = function (x1, y1, x2, y2, angels, directions) {
        var dx = x2 - x1;
        var dy = y1 - y2;
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
    Entity.directionName = function (direction) {
        var directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
        return directions[direction];
    };
    Entity.stateName = function (state) {
        var states = ['idle', 'building', 'moving', 'guarding', 'fighting', 'dying', 'dead'];
        return states[state];
    };
    return Entity;
}(egret.Sprite));
egret.registerClass(Entity,'Entity');
//# sourceMappingURL=Entity.js.map