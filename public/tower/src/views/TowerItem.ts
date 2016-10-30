class TowerItem extends AbstractUI {
    public imgButton: eui.Image;
	public lblPrice: eui.Label;

    private _path: string;
    private _price: number;

    public constructor(path:string, price:number) {
        super("towerItemSkin");

        this._path = path;
        this._price = price;
      
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
    }

	protected onRefresh() {
        this.imgButton.source = this._path;
        this.lblPrice.text = this._price.toString();
        if (application.battle.getGolds() >= this._price){
            this.lblPrice.textColor = 0X000000;
        } else {
            this.lblPrice.textColor = 0XFF0000;
        }
	}

    public static createSellItem(parent:AbstractUI, x:number, y:number, base:Base): TowerItem {
        let towerItem = TowerItem.createItem(parent, x, y, "remove_png", base.getTower().getSellPrice());

		towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			base.setTower(null);

	        parent.hide();
		}, this);

        return towerItem;
    }

    public static createItem(parent:AbstractUI, x:number, y:number, path:string, price:number):TowerItem {
         let towerItem = new TowerItem(path, price);
        towerItem.x = x;
        towerItem.y = y;
        parent.addChild(towerItem);

        return towerItem;       
    }
}
