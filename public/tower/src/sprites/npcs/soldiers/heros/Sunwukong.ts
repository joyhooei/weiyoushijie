class Sunwukong extends Hero {
    public constructor() {
        super();
        
        this._displays.addClip("sunwukong_east_moving", "east-moving")
                        .addClip("sunwukong_east_moving", "guarding")
                        .addClip("sunwukong_east_fighting_1", "east-fighting")
                        .addClip("sunwukong_east_fighting_2", "east-fighting")
                        .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    
    protected _useSkill() {
        let random = Math.round(Math.random() * 10);
        
        if (random <= 5) {
            this._skill = 0;
        } else if (random <= 8) {
            this._skill = 1;
        } else {
            this._skill = 2;
            
            application.battle.addWarriorsByName("Warrior", this);
        }
    }
}
