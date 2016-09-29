class Sunwukong extends Hero {
    private _skill0Ticks: number;

    private _skill1 : number;
    private _skill1Times: number;
    private _skill1Ticks: number;

    private _skill2 : number;
    private _skill2Ticks: number;
    
    public constructor() {
        super();
        
        this.addClip("sunwukong_east_moving", ["east-moving", "south-moving","north-moving"])
            .addBitmap("sunwukong_guarding_png", ["east-guarding", "west-guarding", "south-guarding", "north-guarding"])
            .addClip("sunwukong_east_fighting_1", ["west-fighting", "south-fighting","north-fighting"])
            .addClip("sunwukong_east_fighting_2", ["east-fighting", "south-fighting","north-fighting"])
            .addClip("sunwukong_east_fighting_3", ["east-fighting", "south-fighting","north-fighting"]);
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
        this._skill1Times = 0;
        this._skill2 = 1;
        this._skill0Ticks = this._hitSpeed;
        this._skill1Ticks = 8 * application.frameRate;
        this._skill2Ticks = 10 * application.frameRate;
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
                this._skill1Ticks = (9 - skill.attrs.level) * application.frameRate;
            } else if (legend.skills[i].attrs.name == "猴毛") {
                this._skill2 = skill.attrs.level;
            }
        }
    }

    protected _readyFight() {
        this._skill0Ticks --;
        this._skill1Ticks --;
        this._skill2Ticks --;
        
        //正在腾云突击中
        if (this._skill == 1 && this._skill1Times < this._skill1 && this._enemy && this._enemy.active()) {
            return true;
        }
                
        if (this._skill2Ticks <= 0) {
             //猴毛冷却:10秒
            this._skill = 2;
            
            this._skill2Ticks = 10 * application.frameRate;
            
            return true;
        } else if (this._skill1Ticks <= 0) {
            //腾云突击冷却:8秒，7秒，6秒
            this._skill = 1;
            
            this._skill1Ticks = (9 - this._skill1 / 2) * application.frameRate;
            this._skill1Times = 0;
            
            return true;
        } else if (this._skill0Ticks <= 0) {
            this._skill == 0;
            
            this._skill0Ticks = this._hitSpeed;
            
    	    return true;
        } else {
            return false;
        }
    }

    protected _hitOpponents() {
        if (this._skill == 2) {
            for(let i = 0; i < this._skill2; i++) {
                application.battle.addWarriorsByName("Warrior", this, {maxHp: 60 + (this._skill2 - 1) * 40, guardRadius: this._guardRadius, liveTicks: 8 * application.frameRate});
            }
        } else {
            if (this._skill == 1) {
                this._skill1Times ++;
            }

            super._hitOpponents();
        }
    }
}
