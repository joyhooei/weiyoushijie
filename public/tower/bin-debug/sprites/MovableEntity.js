var MovableEntity = (function (_super) {
    __extends(MovableEntity, _super);
    function MovableEntity() {
        _super.call(this);
    }
    var d = __define,c=MovableEntity,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._moveSpeed = this._get(properties, "moveSpeed", 1);
        this._idleTicks = this._get(properties, "idleTicks", 0);
        this._dyingTicks = this._get(properties, "dyingTicks", application.frameRate);
        this._readyComputeSteps();
    };
    //x和y是脚站立的位置
    p.moveTo = function (x, y) {
        this._targetX = x;
        this._targetY = y;
        this._readyComputeSteps();
        this._turn(this._directionAt(x, y));
    };
    p._readyComputeSteps = function () {
        this._stepX = 0;
        this._stepY = 0;
        this._totalSteps = -1;
        this._steps = 0;
    };
    p._moving = function () {
        if (this._totalSteps == -1) {
            if (!this._computeSteps(this.x, this.y, this._targetX, this._targetY)) {
                this._arrive();
                return;
            }
        }
        if (this._moveOneStep()) {
            this._arrive();
        }
    };
    //走一步，true表示已经到了终点
    p._moveOneStep = function () {
        this._steps++;
        if (this._steps > this._totalSteps) {
            return true;
        }
        else {
            this.x += this._stepX;
            this.y += this._stepY;
            return false;
        }
    };
    p._ahead = function (distance) {
        var steps = Math.min(this._totalSteps - this._steps, Math.round(distance / (this._stepX + this._stepY)));
        if (steps <= 0) {
            return [this.x, this.y];
        }
        else {
            return [this.x + this._stepX * steps, this.y + this._stepY * steps];
        }
    };
    //计一步走的距离
    p._computeSteps = function (x1, y1, x2, y2) {
        this._steps = 0;
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        if (dx >= dy) {
            this._totalSteps = Math.floor(dx / this._moveSpeed);
        }
        else {
            this._totalSteps = Math.floor(dy / this._moveSpeed);
        }
        if (this._totalSteps > 0) {
            this._stepX = dx / this._totalSteps;
            if (x2 < x1) {
                this._stepX = 0 - this._stepX;
            }
            this._stepY = dy / this._totalSteps;
            if (y2 < y1) {
                this._stepY = 0 - this._stepY;
            }
            return true;
        }
        else {
            return false;
        }
    };
    p._idle = function () {
        this._ticks++;
        if (this._ticks >= this._idleTicks) {
            if (this._displays.has(EntityState.building)) {
                this.build();
            }
            else {
                this.move();
            }
        }
    };
    p._dying = function () {
        this._ticks++;
        if (this._ticks >= this._dyingTicks) {
            this.erase();
        }
    };
    return MovableEntity;
}(Entity));
egret.registerClass(MovableEntity,'MovableEntity');
//# sourceMappingURL=MovableEntity.js.map