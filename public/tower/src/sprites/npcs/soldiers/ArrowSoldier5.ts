class ArrowSoldier5 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow5";
        
        this.addClip("arrowsoldier5_east_fighting", ["east-fighting", "south-fighting"])
            .addClip("arrowsoldier5_west_fighting", ["west-fighting", "north-fighting"])
            .addBitmap("arrowsoldier5_guarding_png");
    }
}
