/**
 *
 * @author
 *
 */
var LoginButton = (function (_super) {
    __extends(LoginButton, _super);
    function LoginButton(type, url) {
        _super.call(this);
        this.type = type;
        this.url = url;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/loginButtonSkin.exml";
    }
    var d = __define,c=LoginButton,p=c.prototype;
    p.uiCompHandler = function () {
        var ui = new eui.Image();
        ui.source = this.type + "_png";
        this.icon_group.addChildAt(ui, 0);
        if (this.url && this.url != "") {
            this.right_ui.visible = true;
            var con = new egret.DisplayObjectContainer();
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(100, 100, 100);
            shape.graphics.endFill();
            con.addChild(shape);
            var bitmap = new egret.Bitmap();
            RES.getResByUrl(this.url, function (texture) {
                bitmap.texture = texture;
                bitmap.width = 200;
                bitmap.height = 200;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            con.addChild(bitmap);
            bitmap.mask = shape;
            this.icon_group.addChildAt(con, 0);
        }
        else {
            this.right_ui.visible = false;
        }
        this.name_txt.text = this.getLabelName(this.type, this.url && this.url != "");
    };
    p.getLabelName = function (type, hasUrl) {
        var str = "";
        switch (type) {
            case "qq":
                str = "qq";
                break;
            case "wx":
                str = "微信";
                break;
            case "wb":
                str = "微博";
                break;
            default:
                str = "默认";
        }
        if (hasUrl) {
            return str + "--" + "一键登录";
        }
        return str + "登录";
    };
    return LoginButton;
})(eui.Component);
egret.registerClass(LoginButton,'LoginButton');
