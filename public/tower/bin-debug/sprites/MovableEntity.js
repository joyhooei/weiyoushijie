var MovableEntity = (function (_super) {
    __extends(MovableEntity, _super);
    function MovableEntity() {
        _super.call(this);
        this._step = 10;
        this._steps = [10, 10];
    }
    var d = __define,c=MovableEntity,p=c.prototype;
    p._idle = function () {
        this._do(EntityState.moving);
    };
    p._moveOneStep = function () {
        this.x += this._steps[0];
        this.y += this._steps[1];
        return false;
    };
    //计一步走的距离
    p._computeSteps = function (x, y) {
        var stepX = 0;
        var stepY = 0;
        var dx = Math.abs(this.x - x);
        var dy = Math.abs(this.y - y);
        if (dx >= dy) {
            stepX = this._step;
            if (x < this.x) {
                stepX = 0 - stepX;
            }
            stepY = dy / (dx / stepX);
            if (y < this.y) {
                stepY = 0 - stepY;
            }
        }
        else {
            stepY = this._step;
            if (y < this.y) {
                stepY = 0 - stepY;
            }
            stepX = dx / (dy / stepY);
            if (x < this.x) {
                stepX = 0 - stepX;
            }
        }
        this._steps[0] = stepX;
        this._steps[1] = stepY;
    };
    return MovableEntity;
}(Entity));
egret.registerClass(MovableEntity,'MovableEntity');
//# sourceMappingURL=MovableEntity.js.map