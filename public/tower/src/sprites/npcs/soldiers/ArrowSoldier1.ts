class ArrowSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow";
        
        this.addClip("arrowsoldier1_east_fighting", ["east-fighting", "south-fighting"])
            .addClip("arrowsoldier1_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier1_guarding_png");
    }
}
