var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI() {
        _super.call(this, "battleUISkin");
        var self = this;
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;
        self.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'soldier', image: 'tool_soldier_png' }));
        self.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'fireball', image: 'tool_fireball_png' }));
        application.dao.fetch("Tool", { customer_id: application.me.attrs.id, count: { $gt: 0 } }).then(function (tools) {
            for (var i = 0; i < tools.length; i++) {
                self.grpBoughtTools.addChild(new BattleToolItem(tools[i]));
            }
        });
        application.dao.addEventListener("Battle", function (evt) {
            self.lblLives.text = application.battle.getLives().toString();
            self.lblGolds.text = application.battle.getGolds().toString();
            self.lblWaves.text = application.battle.getWaves().toString();
        }, self);
        self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
            self._quitBattle();
        }, self);
        self.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            HelpUI.showMainHelp();
        }, self);
        self.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.battle.start();
            self.imgStart.visible = false;
        }, self);
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        this.grpBattle.addChild(application.battle);
        this._readyBattle();
    };
    p._readyBattle = function () {
        //this._channel = this._music.play(0, 0);
        this._running = true;
        application.battle.ready();
        this.stage.frameRate = application.frameRate;
        this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
    };
    p._overBattle = function () {
        var self = this;
        if (self._running) {
            self._running = false;
            if (self._channel) {
                self._channel.stop();
            }
            self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
            application.showUI(new BattleOptionUI(function () {
                application.battle = application.pool.get(application.battle.getClaz());
                self._readyBattle();
            }, function () {
                self._quitBattle();
            }));
        }
    };
    p._quitBattle = function () {
        if (application.battle) {
            application.battle.erase();
            application.battle = null;
        }
        application.hideUI(this);
    };
    p._onEnterFrame = function (e) {
        if (application.battle.update()) {
            this._overBattle();
        }
        else {
            application.battle.paint();
        }
    };
    return BattleUI;
}(AbstractUI));
egret.registerClass(BattleUI,'BattleUI');
//# sourceMappingURL=BattleUI.js.map