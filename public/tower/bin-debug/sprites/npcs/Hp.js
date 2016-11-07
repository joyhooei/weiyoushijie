var Hp = (function (_super) {
    __extends(Hp, _super);
    function Hp() {
        _super.call(this);
    }
    var d = __define,c=Hp,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        var hp = this._get(properties, "hp", [5, 10, 15]);
        if (egret.getQualifiedClassName(hp) == "Array") {
            var difficulty = application.battle.getDifficulty();
            if (difficulty <= hp.length) {
                this.setMaxHp(hp[difficulty - 1]);
            }
            else {
                this.setMaxHp(hp[hp.length - 1]);
            }
        }
        else {
            this.setMaxHp(hp);
        }
        this._cureSpeed = this._get(properties, "cureSpeed", 1);
    };
    p.setMaxHp = function (hp) {
        this._maxHp = hp;
        this._hp = hp;
    };
    p.addMaxHp = function (hp) {
        this._maxHp += hp;
        this._hp += hp;
    };
    p.getMaxHp = function () {
        return this._maxHp;
    };
    p.getHp = function () {
        return this._hp;
    };
    p.kill = function () {
        this.setHp(0);
    };
    p.cure = function () {
        this.setHp(this._hp + this._cureSpeed);
    };
    p.damage = function (force) {
        return this.setHp(this._hp - force);
    };
    p.setHp = function (hp) {
        hp = Math.max(0, Math.min(this._maxHp, hp));
        if (hp != this._hp) {
            this._hp = hp;
            this.stain();
        }
        return this._hp <= 0;
    };
    p.paint = function () {
        this.graphics.clear();
        var percent = this._hp / this._maxHp;
        if (percent >= 0.5) {
            this.graphics.beginFill(0x00EC00);
        }
        else if (percent >= 0.1) {
            this.graphics.beginFill(0xFFED97);
        }
        else {
            this.graphics.beginFill(0xff0000);
        }
        this.graphics.drawRect(0, 0, percent * this.width, this.height);
        this.graphics.endFill();
    };
    return Hp;
}(Entity));
egret.registerClass(Hp,'Hp');
//# sourceMappingURL=Hp.js.map