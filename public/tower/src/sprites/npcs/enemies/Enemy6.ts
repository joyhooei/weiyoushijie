class Enemy6 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy6_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy6_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy6_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy6_dying", "east-dying")
            .addClip("enemy6_east_fighting", "east-fighting");
    }
    
    public erase() {
        this._born("Enemy7", this.x, this.y);
        
        super.erase();
    }
}
