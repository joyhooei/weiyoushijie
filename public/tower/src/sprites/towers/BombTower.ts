class BombTower extends ShootTower {
    public constructor() {
        super();
    }

    public guard(){
        super.guard();
        
        let x = this.getCenterX();
        let y = this.y + 20;

        this._addSoldier(x, y);
    }
}
