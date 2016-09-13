class Soldier2 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier2_east_fighting", "east-fighting")
                .addClip("soldier2_east_moving", "east-moving")
                .addClip("soldier2_east_moving", "east-guarding")
                .addClip("soldier2_dying", "dying");
    }
}
