class SoldierTower4 extends SoldierTower {
    public constructor() {
        super();
        
        this.addBitmap("soldiertower4_png");
        
        this._soldierClaz = "Soldier4";
    }
    
    public skillUpgradable(skill:number): boolean {
        return false;
    }

    public upgradable(): boolean {
        return false;
    }
}
