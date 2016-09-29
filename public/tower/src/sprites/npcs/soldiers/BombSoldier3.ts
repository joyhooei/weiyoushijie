class BombSoldier3 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb";
        
        this.addClip("bombsoldier3_fighting", "fighting")
            .addClip("bombsoldier3_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier3_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}