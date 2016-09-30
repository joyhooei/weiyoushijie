class BuildTowerUI extends AbstractUI{
    private _base: Base;
    
    public lblSoldierTower: eui.Label;
    public lblArrowTower: eui.Label;
    public lblBombTower: eui.Label;
    public lblMagicTower: eui.Label;

	private _mcTowers: egret.MovieClip[];

	private _soldierTower: Tower;
	private _arrowTower: Tower;
	private _bombTower: Tower;
	private _magicTower: Tower;
    
    constructor(base: Base) {
        super("buildTowerUISkin");
        
        this._base = base;
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
		
        this._mcTowers = [];
		application.stopwatch.addEventListener("second", function(event:egret.Event){
			if (event.data % 10 == 0) {
				for (let i = 0; i < this._mcTowers.length; i++) {
					this._mcTowers[i].gotoAndPlay(0, 1);
				}
			}
		}, this);
    }
    
    protected onRefresh() {
		this.touchEnabled = true;
		this.touchChildren = true;

		let options = {guardX: this._base.getGuardX(), guardY: this._base.getGuardY()};
		
		this._soldierTower = <Tower>application.pool.get("SoldierTower1",options);
		this.lblSoldierTower.text = this._soldierTower.getPrice();
		this._mcTowers.push(this._renderTower(96, 15, "soldier_tower", this._soldierTower));
		
		this._arrowTower = <Tower>application.pool.get("ArrowTower1", options);
		this.lblArrowTower.text = this._arrowTower.getPrice();
		this._mcTowers.push(this._renderTower(32, 80, "arrow_tower", this._arrowTower));
		
		this._bombTower = <Tower>application.pool.get("BombTower1", options);
		this.lblBombTower.text = this._bombTower.getPrice();
		this._mcTowers.push(this._renderTower(160, 80, "bomb_tower", this._bombTower));
		
		this._magicTower = <Tower>application.pool.get("MagicTower1", options);
		this.lblMagicTower.text = this._magicTower.getPrice();
		this._mcTowers.push(this._renderTower(96, 145, "magic_tower", this._magicTower));
    }

	private _renderTower(x, y, res:string, tower:Tower): egret.MovieClip {
		let data = RES.getRes(res + "_json");
		let txtr = RES.getRes(res + "_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );	

		let clip = new egret.MovieClip( mcFactory.generateMovieClipData( res ) );	
		clip.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    if (application.battle.getGolds() > tower.getPrice()) {
		        this._base.setTower(tower);
		        
		        application.hideUI(this);
		    } else {
				Toast.launch("需要更多的金币");
			}
		}, this);
		clip.touchEnabled = true;

		clip.x = x + 20;
		clip.y = y + 20;

		clip.frameRate = 6;

		this.addChild(clip);
		
		clip.gotoAndPlay(0, 1);

		return clip;
	}
}
