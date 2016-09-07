class Wolf extends Enemy {
    public constructor() {
        super();
        
        this._displays.addClip("wolf_east_moving", "east-moving").addClip("wolf_dying", "dying").addClip("wolf_east_fighting", "east-fighting");
    }

    public paint() {
        this._display(20, 20, this.width, this.height);
    }
}
