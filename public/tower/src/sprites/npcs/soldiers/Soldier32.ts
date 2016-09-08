class Soldier32 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier32_east_fighting", "east-fighting")
                .addClip("soldier32_east_moving", "east-moving")
                .addClip("soldier32_east_moving", "east-guarding")
                .addClip("soldier32_dying", "dying");
    }

    public paint() {
        this._display(-10, -26, this.width, this.height);
    }
}
