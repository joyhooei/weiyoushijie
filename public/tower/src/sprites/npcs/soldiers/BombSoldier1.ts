class BombSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb";
        
        this.addClip("bombsoldier1_fighting", "fighting").addClip("bombsoldier1_guarding", "guarding");
    }
}
