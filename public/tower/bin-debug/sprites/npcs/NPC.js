var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
        this._hp = new Hp();
        this._hp.width = 18;
        this._hp.horizontalCenter = 0;
        this.addChild(this._hp);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hp.initialize(properties);
        this._damage = properties.damage;
        this._hitSpeed = properties.hitSpeed;
    };
    p.setPaths = function (paths) {
        this._paths = paths;
        this._path = 0;
    };
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.moving) {
            var path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
        }
        _super.prototype._stateChanged.call(this, oldState, newState);
    };
    p._dying = function () {
        if (this._ticks >= 5) {
            this._do(EntityState.dead);
        }
    };
    p.hitBy = function (damage) {
        if (this._hp.hitBy(damage) <= 0) {
            this._do(EntityState.dying);
        }
        if (this._state != EntityState.fighting) {
            this._do(EntityState.fighting);
        }
    };
    p._hit = function (npc) {
        npc.hitBy(this._damage);
    };
    p._paint = function () {
        _super.prototype._paint.call(this);
        this._hp._paint();
    };
    //走一步
    p._moveOneStep = function () {
        var path = this._paths[this._path];
        if (Math.abs(this.x - path[0]) < this._step && Math.abs(this.y - path[1]) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            this._path++;
            path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
            this._computeSteps(path[0], path[1]);
        }
        return _super.prototype._moveOneStep.call(this);
    };
    return NPC;
}(MovableEntity));
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map