class ArrowSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow1";
        
        this.addClip("arrowsoldier1_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier1_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier1_guarding_png");
    }
}
