class ArrowSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow";
        
        this.addClip("arrowsoldier1_fighting", "fighting")
            .addClip("arrowsoldier1_guarding", "guarding");
    }
}
