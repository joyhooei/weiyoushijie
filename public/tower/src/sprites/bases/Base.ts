class Base extends Entity implements SelectableEntity {
    protected _tower: Tower;
    
    protected _guardX: number;
    
    protected _guardY: number;
    
    protected _unused: boolean;

    protected _parent: egret.DisplayObjectContainer;

    public constructor() {
        super();

        this.touchEnabled = true;
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        
        this._tower = null;
        
        this._unused = true;

        this.guard();
    }
    
    public unused() : boolean {
        return this._unused;
    }
    
    public getGuardX(): number {
        return this._guardX;
    }
    
    public getGuardY(): number {
        return this._guardY;
    }
    
    public getTower(): Tower {
        return this._tower;
    }
    
    public setTower(tower: Tower) {
        if (this._tower) {
            this._tower.erase();

            if (this._parent) {
                this._parent.addChild(this);
            }
        } 
        
        this._tower = tower;  
        
        if (this._tower) {
            this._tower.setCenterX(this.getCenterX());
            this._tower.setCenterY(this.getCenterY());
            this._tower.setBase(this);
            application.battle.addTower(this._tower);

            if (this.parent) {
                this._parent = this.parent;
                this._parent.removeChild(this);
            }
        
            this._unused = false;
        }
    }
    
    public erase() {
        super.erase();
        
        if (this._tower) {
            this._tower.erase();
            this._tower = null;
        }   
    }

    public select(again:boolean): boolean {
         if (again) {
            this.deselect();

            return false;
        } else {
            application.showUI(new BuildTowerUI(this), application.battle.parent, this.getCenterX(), this.getCenterY());
            
            return true;
        }
    }
    
    public deselect() {
    }
}
