class Bomb1 extends Bomb {
    public constructor() {
        super();
        
        this.addAllBitmaps("bomb1_moving_png", "moving")
            .addAllClips("bomb_fighting", "fighting");
    }
}
