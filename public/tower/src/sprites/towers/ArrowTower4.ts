class ArrowTower4 extends ArrowTower {
    //箭雨
    private _skill1Level: number;
    private _skill1Ticks: number;
    
    //暴击
    private _skill2Level: number;

    public constructor() {
        super();
        
        this.addBitmap("arrowtower4_png");
        
        this._bulletClaz = "Arrow4";
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        
        this._skill2Level = 0;
    }
    
    public upgradeSkill(skill:number) {
        if (skill == 1) {
            this._skill1Level ++;
        } else {
            this._skill2Level ++;
            
            if (this._skill2Level == 1) {
                var critical = 10;
            } else if (this._skill2Level == 1) {
                var critical = 5;
            } else {
                var critical = 5;
            }
            
            let towers = this.findNeighbors();
            for (let i = 0;i < towers.length; i++) {
                towers[i].incCritical(critical);
            }
        }
        
        application.battle.incGolds(-this.getSkillUpgradePrice(skill));        
    }

    public useSkill(tower: Tower) {
        if (this._skill2Level == 1) {
            var critical = 10;
        } else if (this._skill2Level == 1) {
            var critical = 15;
        } else {
            var critical = 20;
        }

        tower.incCritical(critical);
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
                var price = 150;
            }
        } else {
            var price = 200;
        }
        
        return price;
    }

    protected _fighting() {
        super._fighting();

        if (this._skill1Level > 0 && this._enemy && this._skill1Ticks < 0) {
            this._skill1Ticks = application.frameRate * 6;
            
            if (this._skill1Level == 1) {
                var count = 6;
            } else if (this._skill1Level == 2) {
                var count = 8;
            } else {
                var count = 10;
            }
            
            let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            for(let i = 0; i <= Math.min(count, enemies.length); i++) {
                Bullet.shoot(this, enemies[i], this._bulletClaz, {force: 30w + Math.round(Math.random() * 10)});
            }
        }
        this._skill1Ticks --;
    }

    public erase() {
        super.erase();
        
        if (this._skill2Level == 1) {
            var critical = -10;
        } else if (this._skill2Level == 1) {
            var critical = -15;
        } else {
            var critical = -20;
        }
        let towers = this.findNeighbors();
        for (let i = 0;i < towers.length; i++) {
            towers[i].incCritical(critical);
        }
    }

    public getMuzzleX(): number {
        return this.x + 35 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 0;
    }
}
