var MovableEntity = (function (_super) {
    __extends(MovableEntity, _super);
    function MovableEntity() {
        _super.call(this);
    }
    var d = __define,c=MovableEntity,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._step = this._get(properties, "step", 10);
        this._idleTicks = this._get(properties, "idleTicks", 0);
        this._dyingTicks = this._get(properties, "idleTicks", 5);
        this._delta = [];
        this._totalSteps = 0;
        this._steps = 0;
    };
    //走一步，true表示已经到了终点
    p._moveOneStep = function () {
        this._steps++;
        if (this._steps >= this._totalSteps) {
            return true;
        }
        else {
            this.x += this._delta[0];
            this.y += this._delta[1];
            return false;
        }
    };
    //计一步走的距离
    p._computeSteps = function (x, y) {
        var stepX = 0;
        var stepY = 0;
        var dx = Math.abs(this.x - x);
        var dy = Math.abs(this.y - y);
        if (dx >= dy) {
            this._totalSteps = Math.round(dx / this._step);
        }
        else {
            this._totalSteps = Math.round(dy / this._step);
        }
        stepX = dx / this._totalSteps;
        if (x < this.x) {
            stepX = 0 - stepX;
        }
        stepY = dy / this._totalSteps;
        if (y < this.y) {
            stepY = 0 - stepY;
        }
        this._delta = [stepX, stepY];
        this._steps = 0;
    };
    p._idle = function () {
        if (this._ticks >= this._idleTicks) {
            this._do(EntityState.moving);
        }
    };
    p._dying = function () {
        if (this._ticks > this._dyingTicks) {
            this._do(EntityState.dead);
        }
    };
    return MovableEntity;
}(Entity));
egret.registerClass(MovableEntity,'MovableEntity');
//# sourceMappingURL=MovableEntity.js.map