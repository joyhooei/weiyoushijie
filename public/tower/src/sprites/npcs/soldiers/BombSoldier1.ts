class BombSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addClip("bombsoldier1_east_fighting", ["east-fighting", "south-fighting"])
            .addBitmap("bombsoldier1_east_guarding_png", ["east-guarding", "south-guarding"])
            .addBitmap("bombsoldier1_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
