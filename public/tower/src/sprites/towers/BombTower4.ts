class BombTower4 extends BombTower {
    private _skill1Level: number;
    private _skill1Ticks: number;
    
    private _skill2Level: number;
    private _skill2Ticks: number;

    public constructor() {
        super();
        
        this._bulletClaz = "Bomb4";
        
        this.addBitmap("bombtower4_png");
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
    }

    public skillUpgradable(skill:number): boolean {
        if (skill == 1) {
            return this._skill1Level < 3;
        } else if (skill == 2)  {
            return this._skill2Level < 3;
        } else {
            return false;
        }
    }

    public upgradable(): boolean {
        return false;
    }
    
    public getSkillUpgradePrice(skill:number): number {
        if (skill == 1) {
            if (this._skill1Level == 0) {
                var price = 400;
            } else {
                var price = 200;
            }
        } else {
            if (this._skill1Level == 0) {
                var price = 300;
            } else {
                var price = 250;
            }
        }
        
        return price;
    }

    public getSkillLevel(skill:number) {
        if (skill == 1) {
            return this._skill1Level;
        } else {
            return this._skill2Level;
        }
    }
    
    protected _fighting() {
        super._fighting();
        
        if (this._skill1Ticks < 0 && this._skill1Level > 0 && this._enemy) {
            if (this._skill1Level == 1) {
                this._skill1Ticks = 26 * application.frameRate;
            } else if (this._skill1Level == 2) {
                this._skill1Ticks = 23 * application.frameRate;
            } else {
                this._skill1Ticks = 20 * application.frameRate;
            }
            
            Bullet.shoot(this, this._enemy, "Spike");
        }
        this._skill1Ticks --;
        
        if (this._skill2Ticks < 0 && this._skill2Level > 0 && this._enemy) {
            this._skill2Ticks = 12 * application.frameRate;
            
            if (this._skill2Level == 1) {
                var force = 80;
            } else if (this._skill2Level == 2) {
                var force = 140;
            } else {
                var force = 200;
            }
            
            Bullet.shoot(this, this._enemy, "ScorchedEarth", {hitRaduis: this._guardRadius, force: force});
        }
        this._skill2Ticks --;
    }

    public getMuzzleX(): number {
        return this.x + 33;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
