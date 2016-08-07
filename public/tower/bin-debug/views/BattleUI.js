var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI(stage, level) {
        _super.call(this, "battleUISkin");
        this._stage = stage;
        this._level = level;
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        var options = { stage: self._stage, level: self._level };
        application.battle = application.pool.get("Battle" + this._stage);
        application.battle.loadResource(options).then(function () {
            application.battle.initialize(options);
            self.addChildAt(application.battle, 0);
            self.addEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
        }, function (error) {
            Toast.launch(error.message);
        });
    };
    p._onEnterFrame = function (e) {
        application.battle.update();
    };
    return BattleUI;
}(AbstractUI));
egret.registerClass(BattleUI,'BattleUI');
//# sourceMappingURL=BattleUI.js.map