class Sunwukong extends Hero {
    public constructor() {
        super();
        
        this._displays.addClip("sunwukong_east_moving", "east-moving")
                        .addClip("sunwukong_east_moving", "guarding")
                        .addClip("sunwukong_east_fighting_1", "east-fighting")
                        .addClip("sunwukong_east_fighting_2", "east-fighting")
                        .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    
    public setLegend(legend: Legend) {
        let level = legend.level - 1;
        
        this._hp.setMaxHp(level * 15 + this._hp.getMaxHp()); 
        this._armor += level * 5;
        this._forceHigh += level * 2;
        this._forceLow += level;
        
        for (let i = 0; i < legend.skills.length; i++) {
            if (legend.skills[i].name == "重击") {
                this._force = 2 * legend.skills[i].level;
            } else if (legend.skills[i].name == "荆棘甲") {
                this._resistance = 10 +  (legend.skills[i].level - 1) * 20;
            } else if (legend.skills[i].name == "金刚不坏") {
                this._hp.setMaxHp(legend.skills[i].level * 30 + this._hp.getMaxHp()); 
            } else if (legend.skills[i].name == "腾云突击") {
                this._skill1 = 2 * legend.skills[i].level; 
            } else if (legend.skills[i].name == "猴毛") {
                this._skill2 = legend.skills[i].level; 
            }
        }
    }
    
    protected _useSkill() {
        let random = Math.round(Math.random() * 10);
        
        if (random <= 5) {
            this._skill = 0;
        } else if (random <= 8) {
            this._skill = 1;
        } else {
            this._skill = 2;
            
            for(let i = 0; i < this._skill2; i++) {
                application.battle.addWarriorsByName("Warrior", this, {maxHp: 60 + (this._skill2 - 1) * 40});
            }
        }
    }
}
