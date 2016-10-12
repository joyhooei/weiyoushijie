var NotificationUI = (function (_super) {
    __extends(NotificationUI, _super);
    function NotificationUI(notification, cb) {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, function () {
            var _this = this;
            this.lblContent.text = notification.content;
            this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                application.hideUI(_this);
                if (notification.action == 1) {
                    window.location.reload(false);
                }
                else {
                    if (cb) {
                        cb();
                    }
                }
            }, this);
        }, this);
        this.skinName = "resource/custom_skins/notificationUISkin.exml";
    }
    var d = __define,c=NotificationUI,p=c.prototype;
    return NotificationUI;
}(eui.Component));
egret.registerClass(NotificationUI,'NotificationUI');
