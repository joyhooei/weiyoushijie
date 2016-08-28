var SoldierCreator = (function (_super) {
    __extends(SoldierCreator, _super);
    function SoldierCreator() {
        _super.call(this);
    }
    var d = __define,c=SoldierCreator,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._createSpeed = this._get(properties, "createSpeed", 100);
    };
    p.create = function (soldier) {
        return null;
    };
    return SoldierCreator;
}(Entity));
egret.registerClass(SoldierCreator,'SoldierCreator');
//# sourceMappingURL=SoldierCreator.js.map