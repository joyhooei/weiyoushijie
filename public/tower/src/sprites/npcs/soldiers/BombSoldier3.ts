class BombSoldier3 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb3";
        
        this.addClip("bombsoldier3_east_fighting", ["east-fighting", "south-fighting"])
            .addBitmap("bombsoldier3_east_guarding_png", ["east-guarding", "south-guarding"])
            .addBitmap("bombsoldier3_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
