class TowerItem extends AbstractUI {
    public imgButton: eui.Image;
	public lblPrice: eui.Label;

    private _path: string;
    private _price: number;

	private _abnormalColor: number;

    public constructor(path:string, price:number) {
        super("towerItemSkin");

        this._path = path;
        this._price = price;
		
		this._abnormalColor = 0XFF0000;
      
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
    }

	protected onRefresh() {
        this.imgButton.source = this._path;
        this.lblPrice.text = this._price.toString();
		
        if (application.battle.getGolds() >= this._price){
            this.lblPrice.textColor = 0X00FF00;
        } else {
            this.lblPrice.textColor = this._abnormalColor;
        }
	}

	public setAbNormalColor(color: number) {
		this._abnormalColor = color;
	}

    public static createSellItem(parent:AbstractUI, x:number, y:number, base:Base): TowerItem {
        let towerItem = TowerItem.createItem(parent, x, y, "remove_png", base.getTower().getSellPrice());

		towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			application.battle.incGolds(base.getTower().getSellPrice());
			base.setTower(null);
			
	        parent.hide();
		}, this);
		
		towerItem.setAbNormalColor(0X00FF00);

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
