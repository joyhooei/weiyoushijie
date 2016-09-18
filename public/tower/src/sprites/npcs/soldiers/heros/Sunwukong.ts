class Sunwukong extends Hero {
    private _skill1 : number;
    
    private _skill2 : number;
    private _skill1Times: number;
    
    public constructor() {
        super();
        
        this.addClip("sunwukong_east_moving", "east-moving")
                        .addClip("sunwukong_east_moving", "guarding")
                        .addClip("sunwukong_east_fighting_1", "east-fighting")
                        .addClip("sunwukong_east_fighting_2", "east-fighting")
                        .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    
    public setLegend(legend: Legend) {
        let level = legend.attrs.level - 1;
        
        this._hp.setMaxHp(level * 15 + 30 + this._hp.getMaxHp()); 
        this._armor += level * 5;
        this._forceHigh += level * 2;
        this._forceLow += level;
        
        this._force = 0;
        this._skill = 0;
        this._resistance = 10;
        this._skill1 = 2;
        this._skill2 = 1;
        for (let i = 0; i < legend.skills.length; i++) {
            let skill = legend.skills[i];
            
            if (legend.skills[i].attrs.name == "重击") {
                this._force = 2 * skill.attrs.level;
            } else if (legend.skills[i].attrs.name == "荆棘甲") {
                this._resistance = 10 +  (skill.attrs.level - 1) * 20;
            } else if (legend.skills[i].attrs.name == "金刚不坏") {
                this._hp.setMaxHp((skill.attrs.level - 1) * 30 + this._hp.getMaxHp()); 
            } else if (legend.skills[i].attrs.name == "腾云突击") {
                this._skill1 = 2 * skill.attrs.level;
            } else if (legend.skills[i].attrs.name == "猴毛") {
                this._skill2 = skill.attrs.level;
            }
        }
    }

    protected _nextSkill() {
        let random = Math.round(Math.random() * 10);
        
        if (random <= 5) {
            this._skill = 0;
        } else if (random <= 8) {
            this._skill = 1;
            this._skill1Times = 0;
        } else {
            this._skill = 2;
        }        
    }
    
    protected _hitOpponents() {
        if (this._skill == 0) {
            super._hitOpponents();
            
            this._nextSkill();
        } else if (this._skill == 2) {
            for(let i = 0; i < this._skill2; i++) {
                application.battle.addWarriorsByName("Warrior", this, {maxHp: 60 + (this._skill2 - 1) * 40, liveTicks:8 * application.frameRate});
            }
            
            this._nextSkill();
        } else {
            super._hitOpponents();
            
            this._skill1Times ++;
            if (this._skill1Times < this._skill1 && this._enemy && this._enemy.active()) {
                this._playFightMovieClip();
            } else {
                this._nextSkill();
            }
        }
    }
}
