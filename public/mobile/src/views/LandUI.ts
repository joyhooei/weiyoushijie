class LandUI extends eui.Component {
    public constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
    }
}