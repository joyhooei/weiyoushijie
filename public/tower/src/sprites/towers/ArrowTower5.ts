class ArrowTower5 extends ArrowTower {
    //虚弱咒语
    private _skill1Level: number;
    private _skill1Ticks: number;
    
    //封魔咒语
    private _skill2Level: number;
    private _skill2Ticks: number;

    public constructor() {
        super();
        
        this.addBitmap("arrowtower5_png");
        
        this._bulletClaz = "Arrow5";
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        
        this._skill2Level = 0;
        this._skill2Ticks = 0;
    }
    
    public upgradeSkill(skill:number) {
        if (skill == 1) {
            this._skill1Level ++;
        } else {
            this._skill2Level ++;
        }
        
        application.battle.incGolds(-this.getSkillUpgradePrice(skill));        
    }

    public skillUpgradable(skill:number): boolean {
        if (skill == 1) {
            return this._skill1Level < 3;
        } else {
            return this._skill2Level < 3;
        }
    }

    public upgradable(): boolean {
        return false;
    }
    
    public getSkillUpgradePrice(skill:number): number {
        if (skill == 1) {
            if (this._skill1Level == 0) {
                var price = 250;
            } else {
                var price = 200;
            }
        } else {
            var price = 150;
        }
        
        return price;
    }

    protected _fighting() {
        super._fighting();

        if (this._skill1Level > 0 && this._enemy && this._skill1Ticks < 0) {
            this._skill1Ticks = application.frameRate * 12;
            
            if (this._skill1Level == 1) {
                var ticks = 3;
            } else if (this._skill1Level == 2) {
                var ticks = 6;
            } else {
                var ticks = 9;
            }
            
            Bullet.blast(this, "WeakCurse", {hitRaduis: this._guardRadius, fightingTicks: ticks * application.frameRate});
        }
        this._skill1Ticks --;
        
        if (this._skill2Level > 0 && this._enemy && this._skill2Ticks < 0) {
            this._skill2Ticks = application.frameRate * 10;
            
            if (this._skill2Level == 1) {
                var ticks = 3;
            } else if (this._skill2Level == 2) {
                var ticks = 6;
            } else {
                var ticks = 9;
            }
            
            Bullet.blast(this, "MiscastCurse", {hitRaduis: this._guardRadius, fightingTicks: ticks * application.frameRate});
        }
        this._skill2Ticks --;
    }

    public getMuzzleX(): number {
        return this.x + 35 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 0;
    }
}
