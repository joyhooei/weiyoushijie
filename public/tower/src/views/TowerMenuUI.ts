class TowerMenuUI extends AbstractUI{
    private _tower: Tower;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;
    public imgUpgrade: eui.Image;
    public lblUpgraePrice:eui.Label;

    constructor(tower: Tower) {
        super("towerMenuUISkin");
        
        this._tower = tower;
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
		
		this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
		    let price = parseInt(this.lblSellPrice.text);
	        application.battle.incGolds(price);

	        application.battle.hideAllTools();
		}, this);
    }
    
    protected _onRefresh() {
    }
}
