var MovableEntity = (function (_super) {
    __extends(MovableEntity, _super);
    function MovableEntity() {
        _super.call(this);
    }
    var d = __define,c=MovableEntity,p=c.prototype;
    //计一步走的距离
    p._changeSteps = function (x, y) {
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
        this._steps = [stepX, stepY];
    };
    return MovableEntity;
}(Entity));
egret.registerClass(MovableEntity,'MovableEntity');
