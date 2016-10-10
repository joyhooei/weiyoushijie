class Bomb3 extends Bomb {
    public constructor() {
        super();
        
        this.addAllBitmaps("bomb3_moving_png", "moving")
            .addAllClips("bomb_dying", "fighting")
            .addAllBitmaps("bomb3_dying_png", "dying");  
    }
}
