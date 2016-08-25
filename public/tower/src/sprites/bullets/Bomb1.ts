class Bomb1 extends Bomb {
    public constructor() {
        super();
        
        this._displays.addClip("bomb1_json", "bomb1_png", "moving")
                      .addClip("bomb1_json", "bomb1_png", "dying", {state: EntityState.dying});
    }
}
