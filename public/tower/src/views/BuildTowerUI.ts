class BuildTowerUI extends AbstractUI{
    public imgArrowTower;
    public imgBombTower;
    public imgSoliderTower,
    public imgMagicTower;
    
    private _base: Base;
    
    constructor(base:Base) {
        super("buildTowerUISkin");
        
        this.imgArrowTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("ArrowTower");
        },this);

        this.imgBombTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("BombTower");
        },this);

        this.imgSoliderTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("SoliderTower", {"guardX", this._base.getGuardX(), "guardY", this._base.getGuardY()});
        },this);

        this.imgMagicTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this._addTower("MagicTower");
        },this);        
    }
    
    private _addTower(name:string, options?:any) {
        this._base.setTower(application.pool.get(name, options));
    }
}
