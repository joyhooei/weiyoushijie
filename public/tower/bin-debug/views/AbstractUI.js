var AbstractUI = (function (_super) {
    __extends(AbstractUI, _super);
    function AbstractUI(skinName) {
        _super.call(this);
        var self = this;
        self.addEventListener(eui.UIEvent.COMPLETE, self._uiCompHandler, self);
        Utility.delay(function () {
            self.skinName = "resource/custom_skins/" + skinName + ".exml";
        }, 10);
    }
    var d = __define,c=AbstractUI,p=c.prototype;
    p._uiCompHandler = function () {
        try {
            this.onRefresh();
        }
        catch (error) {
            console.error('_uiCompHandler onRefresh failed ' + error.message);
        }
    };
    p.refresh = function () {
        try {
            this.onRefreshAgain();
        }
        catch (error) {
            console.error('refresh onRefresh failed ' + error.message);
        }
    };
    p.onRefresh = function () {
    };
    p.onRefreshAgain = function () {
        this.onRefresh();
    };
    p.show = function (child, hide) {
        if (hide) {
            this.hide();
            application.showUI(child);
        }
        else {
            application.showUI(child, this);
        }
    };
    p.hide = function () {
        application.hideUI(this);
    };
    return AbstractUI;
}(eui.Component));
egret.registerClass(AbstractUI,'AbstractUI');
