var Effect = (function (_super) {
    __extends(Effect, _super);
    function Effect() {
        _super.call(this);
    }
    var d = __define,c=Effect,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this.move();
    };
    return Effect;
}(Entity));
egret.registerClass(Effect,'Effect');
//# sourceMappingURL=Effect.js.map