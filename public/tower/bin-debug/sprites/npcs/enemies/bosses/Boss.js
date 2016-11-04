var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Boss,p=c.prototype;
    p.erase = function () {
        _super.prototype.erase.call(this);
        Utility.delay(function () {
            if (application.battle.getLives() > 0) {
                application.battle.win();
            }
            else {
                application.battle.lose();
            }
        }, 10);
    };
    return Boss;
}(Enemy));
egret.registerClass(Boss,'Boss');
//# sourceMappingURL=Boss.js.map