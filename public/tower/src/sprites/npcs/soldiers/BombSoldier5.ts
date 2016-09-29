class BombSoldier5 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb";
        
        this.addClip("bombsoldier5_fighting", "fighting")
            .addClip("bombsoldier5_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier5_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
