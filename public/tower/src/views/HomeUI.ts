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

    public imgBg: eui.Image;
    public grpMap: eui.Group;

    private _battles: eui.Image[];

    private _shapePath: egret.Shape;

    constructor() {
        super("homeUISkin");
        
        this._battles = [this.imgBattle1, this.imgBattle2, this.imgBattle3, this.imgBattle4, this.imgBattle5, this.imgBattle6, this.imgBattle7, this.imgBattle8, this.imgBattle9, this.imgBattle10, this.imgBattle11, this.imgBattle12, this.imgBattle13, this.imgBattle14, this.imgBattle15];
        
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent)=>{
            for(let i = 0; i < this._battles.length; i++) {
                if (event.target == this._battles[i]) {
                    this._startBattle(i + 1);
                }
            }
        }, this);
        
        application.dao.addEventListener("Result",function(evt: egret.Event) {
            let result = evt.data;
            if (result.result == 1) {
                let i = Math.min(15, result.stage + 1);

                this._battles[i].visible = true;
                this._drawPathSlowly(i);
            }
        }, this);        
    }

    protected onRefresh() {
        let self = this;

        self._shapePath = new egret.Shape();
        self._shapePath.x = self.imgBg.x;
        self._shapePath.y = self.imgBg.y;
        self._shapePath.width  = self.imgBg.width;
        self._shapePath.height = self.imgBg.height;
        self.grpMap.addChild(self._shapePath);
        
        for (let i = 1; i < 15; i++) {
            self._battles[i].visible = false;
        }
        
        application.dao.fetch("Result", {customer_id: application.me.attrs.id, result: 1}, {order: 'stage DESC', limit: 1}).then(function(results){
            self._battles[0].visible = true;
            if (results.length > 0) {
                let maxStage = Math.min(15, results[0].stage + 1);
                for (let i = 1; i < maxStage; i++) {
                    self._battles[i].visible = true;
                    self._drawPathQuckly(i);
                }
            }
        });
    }

    private _drawPathQuckly(i: number) {
        let x0 = this._battles[i - 1].x + this._battles[i - 1].width / 2;
        let y0 = this._battles[i - 1].y + this._battles[i - 1].height / 2;
        
        let x1 = this._battles[i].x + this._battles[i].width / 2;
        let y1 = this._battles[i].y + this._battles[i].height / 2;
        
        let xc = x0 + (x1 - x0) / 2;
        let yc = y0 + (y1 - y0) / 2 - 50;

        let bezier = new CubicBezier(x0, y0, xc, yc, xc, yc, x1, y1);
        
        let last = bezier.get(0);
        let t = 0;
        while (t <= 1) {
            t = t + 0.01;

            let pt = bezier.get(t);

            this._shapePath.graphics.beginFill(0xFF0000, 1);

            let distance = Math.round(Math.sqrt(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2)));
            if (distance >= 12) {
                this._shapePath.graphics.drawCircle(pt[0], pt[1], 4);

                last = pt;
            }

            this._shapePath.graphics.endFill();
        };
    }

    private _drawPathSlowly(i: number) {
        let self = this;

        let x0 = this._battles[i - 1].x + this._battles[i - 1].width / 2;
        let y0 = this._battles[i - 1].y + this._battles[i - 1].height / 2;
        
        let x1 = this._battles[i].x + this._battles[i].width / 2;
        let y1 = this._battles[i].y + this._battles[i].height / 2;
        
        let xc = x0 + (x1 - x0) / 2;
        let yc = y0 + (y1 - y0) / 2 - 50;

        let bezier = new CubicBezier(x0, y0, xc, yc, xc, yc, x1, y1);
        
        let last = bezier.get(0);
        let t = 0;
        let interval = setInterval(function(){
            t = t + 0.01;
            if(t > 1){
                clearInterval(interval);
                return;
            }

            let pt = bezier.get(t);

            self._shapePath.graphics.beginFill(0xFF0000, 1);

            let distance = Math.round(Math.sqrt(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2)));
            if (distance >= 12) {
                self._shapePath.graphics.drawCircle(pt[0], pt[1], 4);

                last = pt;
            }

            self._shapePath.graphics.endFill();
        },50);
        
    }

    private _startBattle(stage:number) {
        this.show(new BattleLoadingUI(stage));
    }
}
