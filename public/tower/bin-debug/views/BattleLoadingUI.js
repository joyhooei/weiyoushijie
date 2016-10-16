var BattleLoadingUI = (function (_super) {
    __extends(BattleLoadingUI, _super);
    function BattleLoadingUI(stage) {
        _super.call(this, "battleLoadingUISkin");
        var self = this;
        application.battle = application.pool.get("Battle" + stage);
        application.battle.loadResource({ stage: stage, level: 1 }).then(function () {
            application.hideUI(self);
            application.showUI(new BattleUI());
        }, function (error) {
            application.hideUI(self);
            Toast.launch(error.message);
        });
    }
    var d = __define,c=BattleLoadingUI,p=c.prototype;
    return BattleLoadingUI;
}(AbstractUI));
egret.registerClass(BattleLoadingUI,'BattleLoadingUI');
//# sourceMappingURL=BattleLoadingUI.js.map