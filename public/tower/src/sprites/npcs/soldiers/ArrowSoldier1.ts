class ArrowSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Arrow1";
        
        this.addClip("arrowsoldier1_east_fighting", ["east-fighting", "south-fighting", "east-guarding", "south-guarding"])
            .addClip("arrowsoldier1_west_fighting", ["west-fighting", "north-fighting", "north-guarding", "west-guarding"]);
    }
}
