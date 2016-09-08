class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier1_east_fighting", "east-fighting")
                .addClip("soldier1_east_moving", "east-moving")
                .addClip("soldier1_east_moving", "east-guarding")
                .addClip("soldier1_dying", "dying");
    }

    public paint() {
        this._display(-10, -26, this.width, this.height);
    }
}
