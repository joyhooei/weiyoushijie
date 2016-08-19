var ArrowEnemy = (function (_super) {
    __extends(ArrowEnemy, _super);
    function ArrowEnemy() {
        _super.call(this);
    }
    var d = __define,c=ArrowEnemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._attackRadius = this._get(properties, "attackRadius", 20);
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        if (this.active()) {
            var soldier = application.battle.findSoldier(this.x, this.y, this._attackRadius);
            if (soldier) {
                this.addSoldier(soldier);
                this.fight();
            }
        }
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soldiers[0].active()) {
                Bullet.shootByNPC(this, this._soldiers[0], "Arrow");
            }
            else {
                this.rmvSoldier(this._soldiers[0]);
            }
        }
    };
    return ArrowEnemy;
}(Enemy));
egret.registerClass(ArrowEnemy,'ArrowEnemy');
//# sourceMappingURL=ArrowEnemy.js.map