class HomeUI extends AbstractUI{ 
    public imgBattle1: eui.Image;

    constructor() {
        super("homeUISkin");
        
        this.imgBattle1.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.showUI(new BattleLoadingUI(2, 1));
        }, this);
    }
}
