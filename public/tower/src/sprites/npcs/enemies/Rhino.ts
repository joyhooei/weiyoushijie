class Rhino extends Enemy {
    public constructor() {
        super();
        
        this._displays.addClip("rhino_east_moving", "east-moving")
                    .addClip("rhino_dying", "dying")
                    .addClip("rhino_east_moving", "guarding")
                    .addClip("rhino_east_fighting", "east-fighting");
    }

    public paint() {
        this._display(20, 20, this.width, this.height);
    }
}
