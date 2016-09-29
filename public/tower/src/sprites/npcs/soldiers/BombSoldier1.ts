class BombSoldier1 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb";
        
        this.addClip("bombsoldier1_fighting", "fighting")
            .addClip("bombsoldier1_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier1_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}