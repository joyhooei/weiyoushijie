class ArrowSoldier2 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow";
        
        this.addClip("arrowsoldier2_east_fighting", ["east-fighting", "south-fighting"])
            .addClip("arrowsoldier2_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier2_guarding_png");
    }
}
