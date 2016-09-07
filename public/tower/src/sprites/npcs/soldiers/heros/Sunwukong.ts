class Sunwukong extends Hero {
    public constructor() {
        super();
        
        this._displays.addClip("sunwukong_east_moving", "east-moving")
                        .addClip("sunwukong_east_moving", "guarding")
                        .addClip("sunwukong_east_fighting_1", "east-fighting")
                        .addClip("sunwukong_east_fighting_2", "east-fighting")
                        .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
}
