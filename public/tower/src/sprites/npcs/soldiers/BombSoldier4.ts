class BombSoldier4 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb4";
        
        this.addClip("bombsoldier4_fighting", "fighting")
            .addClip("bombsoldier4_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier4_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
