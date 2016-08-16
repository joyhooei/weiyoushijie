class TowerMenuUI extends AbstractUI{
    private _tower: Tower;
    
    private _items: eui.Image[];
    private _prices: number[];
    
    constructor(tower:Tower) {
        super("towerMenuUISkin");
        
        this._tower = tower;
        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);        
    }
    
    protected _onRefresh() {
        switch(this._tower.getClassName()) {
            case "SoldierTower1":
                this._addUpgardeItem("SoldierTower2", "", 10, 10);
                break;
        }
        
        this._addSellItem();
    }
    
    private _addUpgardeItem(towerName:string, path: string, x: number, y: number) {
        this._addItem(path,x,y).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            let tower = <Tower>application.pool.get(towerName);
            this._tower.getParent().buildTower(tower);
            
            application.battle.hideAllTools();
        },this);        
    }
    
    private _addLockItem() {
        this._addItem("locktower",0,-14).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            application.battle.hideAllTools();
        },this);        
    }
    
    private _addSellItem() {
        this._addItem("selltower",43,98).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            this._tower.getParent().sellTower();
            
            application.battle.hideAllTools();
        },this);
    }
    
    private _addItem(path: string, x: number, y: number) : eui.Image {
        let image = new eui.Image();
        image.source = path;
        image.x = x;
        image.y = y;
        image.touchEnabled = true;
        this.addChild(image);

        return image;
    }
}
