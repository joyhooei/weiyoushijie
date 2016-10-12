class ArrowSoldier4 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow4";
        
        this.addClip("arrowsoldier4_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier4_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier4_guarding_png");
    }
}
