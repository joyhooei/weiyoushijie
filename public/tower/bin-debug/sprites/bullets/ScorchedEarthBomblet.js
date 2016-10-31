var ScorchedEarthBomblet = (function (_super) {
    __extends(ScorchedEarthBomblet, _super);
    function ScorchedEarthBomblet() {
        _super.call(this);
        this.addClip("scorchedearthbomblet_fighting");
    }
    var d = __define,c=ScorchedEarthBomblet,p=c.prototype;
    p._hitTarget = function () {
        var enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [0, 1]);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].burn(this.getForce(), 4 * application.frameRate);
        }
    };
    return ScorchedEarthBomblet;
}(Bomb));
egret.registerClass(ScorchedEarthBomblet,'ScorchedEarthBomblet');
//# sourceMappingURL=ScorchedEarthBomblet.js.map