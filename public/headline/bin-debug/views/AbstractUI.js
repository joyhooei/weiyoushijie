var AbstractUI = (function (_super) {
    __extends(AbstractUI, _super);
    function AbstractUI(skinName) {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this._uiCompHandler, this);
        this.skinName = "resource/custom_skins/" + skinName + ".exml";
    }
    var d = __define,c=AbstractUI,p=c.prototype;
    p._uiCompHandler = function () {
        var self = this;
        Utility.delay(function () {
            try {
                self.onRefresh();
            }
            catch (error) {
                console.error('_uiCompHandler onRefresh failed ' + error.message);
            }
        }, 10);
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
