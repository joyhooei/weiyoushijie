class ArrowTower extends ShootTower {
    public constructor() {
        super();
    }

    public guard(){
        super.guard();
        
        let x = this.getCenterX();
        let y = this.y + 35;

        this._addSoldier(x, y);
    }
}
