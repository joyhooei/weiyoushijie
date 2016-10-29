//金角大王
class Enemy8 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy8_east_moving", "east-moving")
            .addClip("enemy8_north_moving", "north-moving")
            .addClip("enemy8_east_guarding", "east-guarding")
            .addClip("enemy8_dying", "east-dying")
            .addClip("enemy8_east_fighting", "east-fighting");
    }
}
