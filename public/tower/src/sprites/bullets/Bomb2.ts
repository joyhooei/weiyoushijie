class Bomb2 extends Bomb {
    public constructor() {
        super();
        
        this.addAllBitmaps("bomb2_moving_png", "moving")
            .addAllClips("bomb_fighting", "fighting"); 
    }
}
