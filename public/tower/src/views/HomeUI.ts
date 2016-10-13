class HomeUI extends AbstractUI{ 
    public imgBattle1: eui.Image;

    constructor() {
        super("homeUISkin");
        
        this.imgBattle1.addEventListener( egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent)=>{
            this._startBattle(2);
        }, this);
    }

    private _startBattle(stage:number) {
        this.show(new BattleLoadingUI(stage, 1));
    }
}
