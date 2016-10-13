class HomeUI extends AbstractUI{ 
    public imgBattle1: eui.Image;
    public imgBattle2: eui.Image;
    public imgBattle3: eui.Image;
    public imgBattle4: eui.Image;
    public imgBattle5: eui.Image;
    public imgBattle6: eui.Image;
    public imgBattle7: eui.Image;
    public imgBattle8: eui.Image;
    public imgBattle9: eui.Image;
    public imgBattle10: eui.Image;
    public imgBattle11: eui.Image;
    public imgBattle12: eui.Image;
    public imgBattle13: eui.Image;
    public imgBattle14: eui.Image;
    public imgBattle15: eui.Image;

    constructor() {
        super("homeUISkin");
        
        this._battles = [this.imgBattle1, this.imgBattle2, this.imgBattle3, this.imgBattle4, this.imgBattle5, this.imgBattle6, this.imgBattle7, this.imgBattle8, this.imgBattle9, this.imgBattle10, this.imgBattle11, this.imgBattle12, this.imgBattle13, this.imgBattle14, this.imgBattle15];
        
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent)=>{
            for(let i = 0; i < this._battles.length; i++) {
                if (event.target == this.battles[i]) {
                    this._startBattle(i + 1);
                }
            }
        }, this);
    }

    protected onRefresh() {
        for (let i = 1; i <= 15; i++) {
            this.battles[i - 1].visible = false;
        }
        
        application.dao.fetch("Result", {customer_id: application.me.attrs.id, result: 1}, {order: 'stage DESC', limit: 1}).then(results){
            if (results.length == 1) {
                let maxStage = Math.min(15, results[0].stage + 1);
                for (let i = 2; i <= maxStage; i++) {
                    this.battles[i - 1].visible = true;
                }
            } else {
                this.battles[0].visible = true;
            }
        });
    }

    private _startBattle(stage:number) {
        application.showUI(new BattleLoadingUI(stage, 1));
    }
}
