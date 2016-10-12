class BombSoldier5 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb5";
        
        this.addClip("bombsoldier5_west_fighting", ["west-fighting", "south-fighting"])
            .addBitmap("bombsoldier5_east_guarding_png", ["east-guarding", "south-guarding"])
            .addBitmap("bombsoldier5_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
