var Freeze = (function (_super) {
    __extends(Freeze, _super);
    function Freeze() {
        _super.call(this);
        this.addAllClips("freeze_dying", "fighting");
    }
    var d = __define,c=Freeze,p=c.prototype;
    p._hitTarget = function () {
        var enemies = application.battle.getEnemies();
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].frozen();
        }
    };
    return Freeze;
}(Bullet));
egret.registerClass(Freeze,'Freeze');
//# sourceMappingURL=Freeze.js.map