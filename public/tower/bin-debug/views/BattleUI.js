var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI(stage, level) {
        _super.call(this, "battleUISkin");
        var self = this;
        self._stage = stage;
        self._level = level;
        self.grpSystemTools.addChild(new BattleTimeoutToolItem({ category: 'solider' }));
        self.grpSystemTools.addChild(new BattleTimeoutToolItem({ category: 'fireball' }));
        application.dao.fetch("Tool", { customer_id: application.me.attrs.id, count: { $gt: 0 } }).then(function (tools) {
            for (var i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        });
        self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.battle.erase();
            application.pool.set(application.battle);
            application.battle = null;
            application.battle.hideAllTools();
        }, self);
        self.stage.frameRate = application.frameRate;
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        var options = { stage: self._stage, level: self._level };
        application.battle = application.pool.get("Battle" + this._stage, options);
        application.battle.loadResource(options).then(function () {
            self.addChildAt(application.battle, 0);
            self.addEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
        }, function (error) {
            Toast.launch(error.message);
        });
    };
    p._onEnterFrame = function (e) {
        if (application.battle) {
            application.battle.update();
        }
    };
    return BattleUI;
}(AbstractUI));
egret.registerClass(BattleUI,'BattleUI');
//# sourceMappingURL=BattleUI.js.map