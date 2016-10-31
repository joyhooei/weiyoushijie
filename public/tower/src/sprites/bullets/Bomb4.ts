class Bomb4 extends Bomb {
    public constructor() {
        super();
        
        this.addClip("bomb4_east_fighting", "east-fighting")
            .addClip("bomb4_building", "east-building")
            .addClip("bomb4_south_moving", "south-moving")
            .addClip("bomb4_east_moving", "east-moving");
    }
}
