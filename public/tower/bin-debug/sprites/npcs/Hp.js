var Hp = (function (_super) {
    __extends(Hp, _super);
    function Hp() {
        _super.call(this);
    }
    var d = __define,c=Hp,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._maxHp = this._get(properties, "hp", 100);
        this._hp = this._maxHp;
        this._cureSpeed = this._get(properties, "cureSpeed", 1);
    };
    p.kill = function () {
        this._setHp(0);
    };
    p.cure = function () {
        this._setHp(this._hp + this._cureSpeed);
    };
    p.hitBy = function (damage) {
        return this._setHp(this._hp - damage);
    };
    p._setHp = function (hp) {
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