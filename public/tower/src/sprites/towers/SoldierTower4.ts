class SoldierTower4 extends SoldierTower {
    private _skill1Level: number;    
    private _skill2Level: number;
    private _skill3Level: number;

    public constructor() {
        super();
        
        this.addBitmap("soldiertower4_png");
        
        this._soldierClaz = "Soldier4";
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill1Level = 0;
        this._skill2Level = 0;
        this._skill3Level = 0;
    }

    public totalSkills(): number {
        return 3;
    }
    
    public upgradeSkill(skill:number) {
        if (skill == 1) {
            this._skill1Level ++;

            for(let i = 0; i < this._soldiers.length; i++) {
                this._soldiers[i].addMaxHp(50 * this._skill1Level);
            }
        } else if (skill == 2) {
            this._skill2Level ++;
        } else {
            this._skill3Level ++;
        }
    }

    public skillUpgradable(skill:number): boolean {
        if (skill == 1) {
            return this._skill1Level < 3;
        } else if (skill == 2) {
            return this._skill2Level < 3;
        } else {
            return this._skill3Level < 3;
        }
    }

    public upgradable(): boolean {
        return false;
    }
    
    public getSkillUpgradePrice(skill:number): number {
        if (skill == 1) {
            var price = 200;
        } else if (skill == 2) {
            if (this._skill2Level == 0) {
                var price = 250;
            } else {
                var price = 150;
            }
        } else {
            if (this._skill3Level == 0) {
                var price = 250;
            } else {
                var price = 150;
            }           
        }
        
        return price;
    }

    public getSkillLevel(skill:number) {
        if (skill == 1) {
            return this._skill1Level;
        } else if (skill == 2) {
            return this._skill2Level;
        } else {
            return this._skill3Level;
        }
    }
}
