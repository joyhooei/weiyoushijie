class LoginUI extends eui.Component {
    public btnGroup:eui.Group;

    private loginTypes: Array<nest.easyuser.ILoginType>;
    
    private onChoose: (logType: nest.easyuser.ILoginType) => void;

    public constructor(loginType: Array<nest.easyuser.ILoginType>,onChoose: (logType: nest.easyuser.ILoginType) => void) {
        super();

        this.loginTypes = loginType;
        this.onChoose = onChoose;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;

        for(var i: number = 0;i < this.loginTypes.length; i++) {
            var logT: nest.easyuser.ILoginType = this.loginTypes[i];

            var url = "";
            if (logT.accInfo && logT.accInfo.avatarUrl) {
                url = logT.accInfo.avatarUrl;
            }
            var btn:LoginButton = new LoginButton(logT.loginType, url);
            btn.name = logT.loginType;
            this.btnGroup.addChild(btn);
            btn.scaleX = btn.scaleY = 0.5;

            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                this.onChoose(this.loginTypes[parseInt(e.currentTarget.name)]);
            },this);
        }
    }
}