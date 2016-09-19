class BuildTowerUI extends AbstractUI{
    private _base: Base;
    
    private _imgSoldierTower: eui.Image;
    private _lblSoldierTower: eui.Label;
    
    private _imgArrowTower: eui.Image;
    private _lblArrowTower: eui.Label;
    
    private _imgBombTower: eui.Image;
    private _lblBombTower: eui.Label;
    
    private _imgMagicTower: eui.Image;
    private _lblMagicTower: eui.Label;
    
    constructor(base: Base) {
        super("buildTowerUISkin");
        
        this._base = base;
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
        
		this._imgSoldierTower.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    let price = parseInt(this._lblSoldierTower.text);
		    if (applicaton.battle.getGold() > price) {
		        application.battle.incGolds(-price);
		        
		        this._base.setTower(application.pool.get("SoldierTower"));
		        
		        application.battle.hideAllTools();
		    }
		}, this);       
		
        
		this._imgArrowTower.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    let price = parseInt(this._lblArrowTower.text);
		    if (applicaton.battle.getGold() > price) {
		        application.battle.incGolds(-price);
		        
		        this._base.setTower(application.pool.get("ArrowTower"));
		        
		        application.battle.hideAllTools();
		    }
		}, this);  
		
        
		this._imgBombTower.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    let price = parseInt(this._lblBombTower.text);
		    if (applicaton.battle.getGold() > price) {
		        application.battle.incGolds(-price);
		        
		        this._base.setTower(application.pool.get("BombTower"));
		        
		        application.battle.hideAllTools();
		    }
		}, this);  
		
		this._imgMagicTower.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    let price = parseInt(this._lblMagicTower.text);
		    if (applicaton.battle.getGold() > price) {
		        application.battle.incGolds(-price);
		        
		        this._base.setTower(application.pool.get("MagicTower"));
		        
		        application.battle.hideAllTools();
		    }
		}, this);
    }
    
    protected _onRefresh() {
    }
}
