class Reinforce extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("reinforce_east_fighting", "east-fighting")
                .addClip("reinforce_east_moving", "east-moving")
                .addClip("reinforce_east_moving", "guarding")
                .addClip("reinforce_dying", "dying");
    }

    public paint() {
        this._display(-10, -26, this.width, this.height);
    }
}
