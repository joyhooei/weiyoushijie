var MovableEntity = (function (_super) {
    __extends(MovableEntity, _super);
    function MovableEntity() {
        _super.call(this);
    }
    var d = __define,c=MovableEntity,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._step = this._get(properties, "step", 1);
        this._idleTicks = this._get(properties, "idleTicks", 0);
        this._dyingTicks = this._get(properties, "dyingTicks", 5);
        this._stepX = 0;
        this._stepY = 0;
        this._totalSteps = 0;
        this._steps = 0;
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
    //计一步走的距离
    p._computeSteps = function (x1, y1, x2, y2) {
        this._steps = 0;
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        if (dx >= dy) {
            this._totalSteps = Math.floor(dx / this._step);
        }
        else {
            this._totalSteps = Math.floor(dy / this._step);
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
            this.move();
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