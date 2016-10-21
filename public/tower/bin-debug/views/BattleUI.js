var BattleUI = (function (_super) {
    __extends(BattleUI, _super);
    function BattleUI() {
        _super.call(this, "battleUISkin");
        var self = this;
        self._music = RES.getRes("bg_mp3");
        self._music.type = egret.Sound.MUSIC;
        self.grpHeader.touchEnabled = false;
        application.dao.fetch("Tool", { customer_id: application.me.attrs.id }).then(function (tools) {
            var toolCategories = ["thunder", "freeze", "nectar", "mammon"];
            for (var i = 0; i < toolCategories.length; i++) {
                var tool = null;
                for (var j = 0; j < tools.length; j++) {
                    if (tools[j].category == toolCategories[i]) {
                        tool = tools[j];
                        tool.count = tool.count || 0;
                    }
                }
                if (null == tool) {
                    tool = { category: toolCategories[i], count: 1, customer_id: application.me.attrs.id };
                }
                self.grpBoughtTools.addChild(new BattleToolItem(tool));
            }
        });
        application.dao.addEventListener("Battle", function (evt) {
            if (parseInt(self.lblGolds.text) != application.battle.getGolds()) {
                self._animateStep(self.lblGolds, parseInt(self.lblGolds.text), application.battle.getGolds());
            }
            self.lblLives.text = application.battle.getLives().toString();
            self.lblWaves.text = application.battle.getCurrentWave().toString();
        }, self);
        self.imgTool.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.grpTools.visible = !self.grpTools.visible;
        }, self);
        self.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
            self._quitBattle();
        }, self);
        self.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            HelpUI.showMainHelp();
        }, self);
        self.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.battle.fight();
            self.imgTool.visible = true;
            self.grpSystemTools.visible = true;
            self.imgStart.visible = false;
        }, self);
    }
    var d = __define,c=BattleUI,p=c.prototype;
    p.onRefresh = function () {
        this.grpSystemTools.visible = false;
        this.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'soldier', count: 1 }));
        this.grpSystemTools.addChild(new BattleSystemToolItem({ category: 'fireball', count: 1 }));
        this._svBattle = new egret.ScrollView();
        //设置滚动区域宽高
        this._svBattle.width = this.width;
        this._svBattle.height = this.height;
        this._svBattle.bounces = false;
        this.grpBattle.addChild(this._svBattle);
        this._buildBattle();
    };
    p._animateStep = function (lbl, from, to) {
        if (from == to) {
            return;
        }
        var step = Math.min(Math.abs(from - to), 20);
        var delta = (to - from) / step;
        var timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            lbl.text = Math.round(from + delta * event.target.currentCount).toString();
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
            lbl.text = to.toString();
        }, this);
        timer.start();
    };
    p._buildBattle = function () {
        //this._channel = this._music.play(0, 0);
        this.imgStart.visible = true;
        this.grpTools.visible = false;
        this.imgTool.visible = false;
        this.grpSystemTools.visible = false;
        this.grpHeader.visible = true;
        this._running = true;
        this.lblLives.text = "0";
        this.lblGolds.text = "0";
        this.lblWaves.text = "0";
        this.lblTotalWaves.text = application.battle.getTotalWaves().toString();
        this._svBattle.setContent(application.battle);
        application.battle.build();
        //this.stage.frameRate = application.frameRate;
        this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
    };
    p._overBattle = function () {
        var self = this;
        self.imgStart.visible = false;
        self.grpTools.visible = false;
        self.imgTool.visible = false;
        self.grpSystemTools.visible = false;
        self.grpHeader.visible = false;
        if (self._running) {
            self._running = false;
            if (self._channel) {
                self._channel.stop();
            }
            self.removeEventListener(egret.Event.ENTER_FRAME, self._onEnterFrame, self);
            application.showUI(new BattleOptionUI(function () {
                application.battle.erase();
                application.pool.set(application.battle);
                application.battle = application.pool.get(application.battle.getClaz());
                self._buildBattle();
            }, function () {
                self._quitBattle();
            }));
        }
    };
    p._quitBattle = function () {
        if (application.battle) {
            application.battle.erase();
            application.pool.set(application.battle);
            application.battle = null;
        }
        this.hide();
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