var MessageUI = (function (_super) {
    __extends(MessageUI, _super);
    function MessageUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/messageUISkin.exml";
    }
    var d = __define,c=MessageUI,p=c.prototype;
    p.refresh = function () {
        var self = this;
        self.lstMessage.removeChildren();
        application.dao.fetch("Message", { customer_id: application.me.attrs.id, state: 0 }, { order: "create_time ASC" }).then(function (messages) {
            if (messages.length >= 1) {
                self.messages = messages;
                self.renderMessages(messages);
            }
        });
        application.dao.fetch("Message", { customer_id: application.me.attrs.id, state: 1 }, { order: "update_time DESC" }).then(function (messages) {
            if (messages.length >= 1) {
                self.messagesPicked = messages;
                self.renderMessages(messages);
            }
        });
    };
    p.renderMessages = function (messages) {
        for (var i = 0; i < messages.length; i++) {
            this.lstMessage.addChild(new MessageItem(messages[i]));
        }
    };
    p.uiCompHandler = function () {
        var _this = this;
        this.refresh();
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
    };
    return MessageUI;
}(eui.Component));
egret.registerClass(MessageUI,'MessageUI');
//# sourceMappingURL=MessageUI.js.map