class Soldier31 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier31_east_fighting", "east-fighting")
                .addClip("soldier31_east_moving", "east-moving")
                .addClip("soldier31_east_moving", "east-guarding")
                .addClip("soldier31_dying", "dying");
    }

    public paint() {
        this._display(-10, -26, this.width, this.height);
    }
}
