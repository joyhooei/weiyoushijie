var MessageItem = (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem(message) {
        _super.call(this);
        this.skinName = "resource/custom_skins/messageItemSkin.exml";
        this.refresh(message);
        var dt = new Date(message.create_time);
        this.lblDay.text = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        this.lblDay.touchEnabled = false;
        this.lblTitle.touchEnabled = false;
        this.lblContent.touchEnabled = false;
        this.imgAttach.touchEnabled = false;
        this.lblAttach.touchEnabled = false;
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new MessageDetailUI(message));
        }, this);
        this.imgOperate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            if (this.imgOperate.source == "get_png") {
                if (message.attach_category == "diamond") {
                    application.customer.diamond += message.attach_quantity;
                }
                else if (message.attach_category == "gold") {
                    application.customer.gold += message.attach_quantity;
                }
                else {
                    application.customer.metal += message.attach_quantity;
                }
                message.state = 1;
                application.dao.save("Message", message);
                application.saveCustomerNow();
                this.imgOperate.source = "del_png";
            }
            else {
                message.state = 2;
                application.dao.save("Message", message);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }, this);
        application.dao.addEventListener("Message", function (ev) {
            if (ev.data.id == message.id) {
                if (ev.data.state == 2) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                }
                else {
                    this.refresh(message);
                }
            }
        }, this);
    }
    var d = __define,c=MessageItem,p=c.prototype;
    p.refresh = function (message) {
        this.lblTitle.text = message.title;
        this.lblContent.text = message.content;
        if (message.attach_quantity > 0) {
            this.imgAttach.visible = true;
            if (message.attach_category == "diamond") {
                this.imgAttach.source = "dia_png";
            }
            else if (message.attach_category == "gold") {
                this.imgAttach.source = "coin_png";
            }
            else {
                this.imgAttach.source = "metal_png";
            }
            this.lblAttach.text = "x" + message.attach_quantity;
        }
        else {
            this.imgAttach.visible = false;
        }
        if (message.state == 0) {
            if (message.attach_quantity > 0) {
                this.imgOperate.source = "get_png";
            }
            else {
                this.imgOperate.source = "del_png";
            }
            this.imgBg.source = "bar_png";
        }
        else {
            this.imgOperate.source = "del_png";
            this.imgBg.source = "bargery_png";
        }
    };
    return MessageItem;
}(eui.Component));
egret.registerClass(MessageItem,'MessageItem');
