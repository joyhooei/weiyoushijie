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
        
        let x = this.getCenterX() - 10;
        let y = this.y + 10;

        this._soldier =  <ShootSoldier>application.pool.get(this._soldierClaz, {guardRadius: this._guardRadius});
        
        this._soldier.setCenterX(x);
        this._soldier.setBottomY(y);
        
        application.battle.addEntity(this._soldier);
    }
}
