class HomeUI extends AbstractUI{ 
    public imgBattle1: eui.Image;

    constructor() {
        super("homeUISkin");
    }

    protected onRefresh():void {
        this.imgBattle1.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.showUI(new BattleLoadingUI(1, 1));
        }, this); 
    }
}
