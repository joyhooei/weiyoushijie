/**
 *
 * @author 
 *
 */
class LoginButton extends eui.Component{
    public icon_group:eui.Group;
    public right_ui:eui.Image;
    public name_txt:eui.Label;

    private type:string;
    private url:string;

    public constructor(type:string, url:string) {
          super();

          this.type = type;
          this.url = url;
      
          this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
          this.skinName = "resource/custom_skins/loginButtonSkin.exml";
    }
	
	private uiCompHandler(): void {   
        var ui:eui.Image = new eui.Image();
        ui.source = this.type + "_png";
        this.icon_group.addChildAt(ui, 0);

        if (this.url && this.url != "") {
            this.right_ui.visible = true;

            var con:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            var shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(100, 100, 100);
            shape.graphics.endFill();
            con.addChild(shape);

            var bitmap:egret.Bitmap = new egret.Bitmap();
            RES.getResByUrl(this.url, function (texture) {
                bitmap.texture = texture;
                bitmap.width = 200;
                bitmap.height = 200;
            }, this, RES.ResourceItem.TYPE_IMAGE);
            con.addChild(bitmap);
            bitmap.mask = shape;

            this.icon_group.addChildAt(con, 0);
        } else {
            this.right_ui.visible = false;
        }

        this.name_txt.text = this.getLabelName(this.type, this.url && this.url != "");
	}

    private getLabelName(type:string, hasUrl:boolean):string {
        var str:string = "";
        switch (type) {
            case "qq" :
                str = "qq";
                break;
            case "wx" :
                str = "微信";
                break;
            case "wb" :
                str = "微博";
                break;
            default:
                str = "默认";
        }

        if (hasUrl) {
            return str + "--" + "一键登录";
        }

        return str + "登录";
    }
}