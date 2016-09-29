class BombSoldier2 extends ShootSoldier {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb2";
        
        this.addClip("bombsoldier2_east_fighting", ["east-fighting", "south-fighting"])
            .addClip("bombsoldier2_east_guarding_png", ["east-guarding", "south-guarding"])
            .addClip("bombsoldier2_west_guarding_png", ["west-guarding", "north-guarding"]);
    }
}
