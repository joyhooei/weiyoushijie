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
        let random = Math.floor(Math.random() * 10);
        
        if (random <= 5) {
            this._damage = this._defaultDamage;
            
            this._skill = 0;
        } else if (random <= 7) {
            this._damage = this._defaultDamage << 1;
            
            this._skill = 1;
        } else {
            this._damage = 0;
            
            application.battle._addWarriorsByName("Warrior", this);
            
            this._skill = 2;
        }
    }
    
    public paint() {
        this._display(-10, -26, this.width, this._skill);
    }    
}
