class MagicSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Magic";
        
        this.addClip("magicsoldier1_fighting", "fighting")
            .addClip("magicsoldier1_guarding", "guarding");
    }
}
