class BuildTowerUI extends AbstractUI{
    public imgArrowTower: eui.Image;
    public imgBombTower: eui.Image;
    public imgSoliderTower: eui.Image;
    public imgMagicTower: eui.Image;
    
    private _imgTowers: eui.Image[]: 
    
    private _base: Base;
    
    constructor(base:Base) {
        super("buildTowerUISkin");
        
        this._imgTowers = [this.imgArrowTower, this.imgBombTower, this.imgSoliderTower, this.imgMagicTower];
        
        this.imgArrowTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("ArrowTower");
        },this);

        this.imgBombTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("BombTower");
        },this);

        this.imgSoliderTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("SoliderTower", {"guardX": this._base.getGuardX(), "guardY": this._base.getGuardY()});
        },this);

        this.imgMagicTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("MagicTower");
        },this);  
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
    }
    
    protected _onRefresh() {
        let prices = [100, 200, 300, 400];
        let golds = application.battle.getGolds();
        for (let i = 0; i < this._imgTowers.length; i++) {
            if (golds >= prices[i]) {
                this._imgTowers.source = "";
            } else {
                this._imgTowers.source = "";
            }
        }
    }
    
    private _addTower(name:string, options?:any) {
        let golds = application.battle.getGolds();
        if (golds >= tower.getPrice()) {
            let tower = <Tower>application.pool.get(name, options);
            tower.x = this._base.x;
            tower.y = this._base.y;
            this._base.buildTower(tower);
        }
    }
}
