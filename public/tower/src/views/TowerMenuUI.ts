class TowerMenuUI extends AbstractUI{
    private _tower : Tower;
    
    constructor(tower:Tower) {
        super("towerMenuUISkin");
        
        this._tower = tower;
    }
    
    private _addUpgardeImage(towerName:string, path: string, x: number, y: number) {
        this._addImage(path,x,y).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            let tower = <Tower>application.pool.get(towerName);
            this._tower.getParent().buildTower(tower);
            
            application.hideUI(this);
        },this);        
    }
    
    private _addLockImage() {
        this._addImage("locktower",0,-14).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            application.hideUI(this);
        },this);        
    }
    
    private _addSellImage() {
        this._addImage("selltower",43,98).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent){
            this._tower.getParent().sellTower();
            
            application.hideUI(this);
        },this);
    }
    
    private _addImage(path: string, x: number, y: number) : eui.Image {
        let image = new eui.Image();
        image.source = path;
        image.x = x;
        image.y = y;
        image.touchEnabled = true;
        this.addChild(image);

        return image;
    }
}
