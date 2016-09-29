class ShootTower extends Tower {
    protected _soldier: ShootSoldier;
    
    protected _soldierClaz: string;

    public constructor() {
        super();
    }

    public erase() {
        super.erase();
        
        if (this._soldier) {
            this._soldier.erase();
        }
        this._soldier = null;
    }

    public guard(){
        super.guard();

        this._soldier =  <ShootSoldier>application.pool.get(claz, {guardX: this.getCenterX(), guardY: this.getCenterY(), guardRadius: this._guardRadius});
                
        this._soldier.setCenterX(this.getCenterX());
        this._soldier.setBottomY(this.getCenterY());
        
        application.battle.addEntity(this._soldier);
    }
}
