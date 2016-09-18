var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI() {
        _super.call(this, "battleUISkin");
        var self = this;
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;
        self.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'soldier' }));
        self.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'fireball' }));
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
        self.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self._startBattle();
            self.imgStart.visible = false;
        }, self);
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        this.grpBattle.addChild(application.battle);
    };
    p._quitBattle = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
        application.battle.erase();
        application.battle = null;
        application.hideUI(this);
    };
    p._startBattle = function () {
        //this._channel = this._music.play(0, 0);
        application.battle.start();
        this.stage.frameRate = application.frameRate;
        this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
    };
    p._restartBattle = function () {
        application.battle = application.pool.get(application.battle.getClassName());
        this._startBattle();
    };
    p._onEnterFrame = function (e) {
        if (application.battle.update()) {
            var self_1 = this;
            if (self_1._channel) {
                self_1._channel.stop();
            }
            application.showUI(new BattleOptionUI(function () {
                self_1._restartBattle();
            }, function () {
                self_1._quitBattle();
            }));
        }
        else {
            application.battle.paint();
        }
    };
    return BattleUI;
}(AbstractUI));
egret.registerClass(BattleUI,'BattleUI');
//# sourceMappingURL=BattleUI.js.map