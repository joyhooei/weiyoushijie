var GroupEnemy = (function (_super) {
    __extends(GroupEnemy, _super);
    function GroupEnemy() {
        _super.apply(this, arguments);
    }
    var d = __define,c=GroupEnemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._group = [];
    };
    p._existed = function (enemies, enemy) {
        for (var j = 0; j < enemies.length; j++) {
            if (enemy == enemies[j]) {
                return true;
            }
        }
        return false;
    };
    p.update = function () {
        if (this.active()) {
            var enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), 80, [-1, 0, 1]);
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if (!this._existed(this._group, e)) {
                    this._enterGroup(e);
                }
            }
            for (var i = 0; i < this._group.length; i++) {
                var e = this._group[i];
                if (!this._existed(enemies, e)) {
                    if (e.active()) {
                        this._leaveGroup(e);
                    }
                }
            }
            this._group = enemies;
        }
        else {
            for (var i = 0; i < this._group.length; i++) {
                if (this._group[i].active()) {
                    this._leaveGroup(this._group[i]);
                }
            }
            this._group = [];
        }
        return _super.prototype.update.call(this);
    };
    return GroupEnemy;
}(Enemy));
egret.registerClass(GroupEnemy,'GroupEnemy');
//# sourceMappingURL=GroupEnemy.js.map