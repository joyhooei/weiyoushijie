class BuildTowerUI extends AbstractUI{
    private _base: Base;
    
    private _mcSoldierTower: egret.MovieClip;
    private _lblSoldierTower: eui.Label;
    
    private _mcArrowTower: egret.MovieClip;
    private _lblArrowTower: eui.Label;
    
    private _mcBombTower: egret.MovieClip;
    private _lblBombTower: eui.Label;
    
    private _mcMagicTower: egret.MovieClip;
    private _lblMagicTower: eui.Label;
    
    constructor(base: Base) {
        super("buildTowerUISkin");
        
        this._base = base;
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
    }
    
    protected onRefresh() {
		this.touchEnabled = true;
		this.touchChildren = true;

		this._renderTower(96, 15, "soldier_tower", "SoldierTower1", 300);
		this._renderTower(32, 80, "arrow_tower", "ArrowTower1", 300);
		this._renderTower(160, 80, "bomb_tower", "BombTower1", 300);
		this._renderTower(96, 145, "magic_tower", "MagicTower1", 300);
    }

	private _renderTower(x, y, res:string, claz:string, price:number) {
		let data = RES.getRes(res + "_json");
		let txtr = RES.getRes(res + "_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );	

		let clip = new egret.MovieClip( mcFactory.generateMovieClipData( res ) );	
		clip.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    if (application.battle.getGolds() > price) {
		        application.battle.incGolds(-price);
		        
		        this._base.setTower(<Tower>application.pool.get(claz));
		        
		        application.hideUI(this);
		    }
		}, this);
		clip.touchEnabled = true;

		clip.x = x + 20;
		clip.y = y + 20;

		clip.frameRate = 8;

		this.addChild(clip);

		clip.gotoAndPlay(0, -1);
	}
}
