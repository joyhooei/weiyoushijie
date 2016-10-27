class Shaseng extends Hero {
    public constructor() {
        super();
        
        this.addClip("sunwukong_east_moving", ["east-moving", "south-moving","north-moving"])
            .addBitmap("sunwukong_guarding_png", ["east-guarding", "west-guarding", "south-guarding", "north-guarding"])
            .addClip("sunwukong_west_fighting_1", ["west-fighting", "south-fighting","north-fighting"])
            .addClip("sunwukong_east_fighting_2", ["east-fighting", "south-fighting","north-fighting"])
            .addClip("sunwukong_east_fighting_3", ["east-fighting", "south-fighting","north-fighting"])
            .addClip("sunwukong_dying", ["dying"]);
    }

    protected _readyFight(): boolean {
        return true;
    }

    protected _hitOpponents() {
    }
}
