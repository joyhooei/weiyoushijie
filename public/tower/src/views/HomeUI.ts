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

    private _paths: number[][][];

    constructor() {
        super("homeUISkin");
        
        this._paths = [
                [[327, 95], [337, 142], [276, 157], [211, 189], [143, 126]],
            ];
        
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

    private _drawPathQuckly(stage: number) {
        let path = this._paths[stage - 1];
        if (path) {
            for(let i = 0; i < path.length - 1; i++) {
                let t = 0;
                let bezier = this._createCubicBezier(path, i);
                while (t < 1) {
                    t = this._drawPathPoint(bezier, t);
                };
            }
        }
    }

    private _drawPathSlowly(stage: number) {
        let self = this;

        let path = this._paths[stage - 1];
        if (path) {
            let i = 0;
            let t = 0;
            let bezier = this._createCubicBezier(path, i);
            let interval = setInterval(function(){
                if (t < 1) {
                    t = self._drawPathPoint(bezier, t);
                } else {
                    i += 1;
                    if (i >= path.length - 1) {
                        clearInterval(interval);
                    } else {
                        t = 0;
                        bezier = this._createCubicBezier(path, i);
                    }
                }
            }, 100);
        }
    }

    private _createCubicBezier(path, i): CubicBezier {
        let cps = CubicBezier.getCtrlPoints(path, i);
        let bezier = new CubicBezier([path[i], cps[0], cps[1], path[i + 1]]);

        this._drawPoint(bezier.get(0), 0XFF0000);
        this._drawPoint(bezier.get(1), 0XFF0000);
        
        return bezier;
    }        

    private _drawPathPoint(bezier:CubicBezier, t: number) {
       let last = bezier.get(t);
            
       while(t <= 1) {
            t = t + 0.01;
            let pt = bezier.get(t);

            let distance = Math.round(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2));
            if (distance >= 64) {
                this._drawPoint(pt, 0);

                return t;
            }
        }
        
        return t;
    }

    private _drawPoint(pt: number[], color:number) {
        this._shapePath.graphics.beginFill(color, 1);
        this._shapePath.graphics.drawCircle(pt[0], pt[1], 3);
        this._shapePath.graphics.endFill();
    }

    private _startBattle(stage:number) {
        this.show(new BattleLoadingUI(stage));
    }
}
