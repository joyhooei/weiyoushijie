class ArrowSoldier3 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow3";
        
        this.addClip("arrowsoldier3_east_fighting", ["east-fighting", "south-fighting", "guarding"])
            .addClip("arrowsoldier3_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier3_guarding_png");
    }
}
