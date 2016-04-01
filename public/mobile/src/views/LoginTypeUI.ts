/**
 *
 * @author
 *
 */
class LoginTypeUI extends eui.Component {
    public btnGroup:eui.Group;

    private loginType:nest.easeuser.ILoginTypes;

    public constructor(loginType:nest.easeuser.ILoginTypes) {
        super();

        this.loginType = loginType;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/loginTypeUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;

        for (var i:number = 0; i < this.loginType.loginTypes.length; i++) {
            var logT:nest.easeuser.ILoginType = this.loginType.loginTypes[i];

            var url = "";
            if (logT.accInfo && logT.accInfo.avatarUrl) {
                url = logT.accInfo.avatarUrl;
            }
            var btn:LoginButton = new LoginButton(logT.loginType, url);
            btn.name = logT.loginType;
            this.btnGroup.addElement(btn);
            btn.scaleX = btn.scaleY = 0.5;

            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                self.loginType.onChoose(this.name);
            }, btn);
        }
    }
}