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
    };
    p.kill = function () {
        this.hitBy(this._hp);
    };
    p.hitBy = function (damage) {
        var hp = Math.max(0, this._hp - damage);
        if (hp != this._hp) {
            this._hp = hp;
            this.stain();
        }
        return hp > 0;
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
        this.graphics.drawRect(0, 0, percent * this.width, 20);
        this.graphics.endFill();
    };
    return Hp;
}(Entity));
egret.registerClass(Hp,'Hp');
//# sourceMappingURL=Hp.js.map