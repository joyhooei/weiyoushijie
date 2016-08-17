var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI() {
        _super.call(this, "battleUISkin");
        var self = this;
        self.grpBattle.addChild(application.battle);
        self.grpSystemTools.addChild(new BattleTimeoutToolItem({ category: 'solider' }));
        self.grpSystemTools.addChild(new BattleTimeoutToolItem({ category: 'fireball' }));
        application.dao.fetch("Tool", { customer_id: application.me.attrs.id, count: { $gt: 0 } }).then(function (tools) {
            for (var i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        });
        application.dao.addEventListener("Battle", function (evt) {
            self.lblLives.text = application.battle.getLives().toString();
            self.lblGolds.text = application.battle.getGolds().toString();
        }, self);
        self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self._quitBattle();
        }, self);
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        this._startBattle();
    };
    p._quitBattle = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
        application.battle.erase();
        application.battle = null;
        application.hideUI(this);
    };
    p._startBattle = function () {
        application.battle.initialize({});
        this.stage.frameRate = application.frameRate;
        this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
    };
    p._onEnterFrame = function (e) {
        if (application.battle.update()) {
            var self_1 = this;
            application.showUI(new BattleOptionUI(function () {
                self_1._startBattle();
            }, function () {
                self_1._quitBattle();
            }), self_1);
        }
    };
    return BattleUI;
}(AbstractUI));
egret.registerClass(BattleUI,'BattleUI');
//# sourceMappingURL=BattleUI.js.map