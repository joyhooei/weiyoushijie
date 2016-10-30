class MagicTower4 extends MagicTower implements SoldierCreator {
    private _blackImpermanence: BlackImpermanence;
    
    private _skill1Level: number;
    private _skill1Ticks: number;
    
    private _skill2Level: number;
    
    public constructor() {
        super();
        
        this.addBitmap("magictower4_png")
            .addClip("magictower4_guarding", "east-guarding")
            .addClip("magictower4_fighting", "east-fighting")

        this._bulletClaz = "Magic4";
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        
        this._skill2Level = 0;
        
        this._blackImpermanence = null;
    }
    
    public upgradeSkill(skill:number) {
        if (skill == 1) {
            this._skill1Level ++;
        } else {
            this._skill2Level ++;
            
            if (this._blackImpermanence) {
                this._blackImpermanence.erase();
            }
            
            this._addBlackImpermanence();
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
                var price = 325;
            } else {
                var price = 200;
            }
        } else {
            if (this._skill1Level == 0) {
                var price = 300;
            } else {
                var price = 150;
            }
        }
        
        return price;
    }
    
    private _addBlackImpermanence() {
        if (this._skill2Level == 1) {
            var options = {hp: 250, arm: 40, forceHigh: 10, forceLow: 5, guardX: this._guardX, guardY: this._guardY};
        } else if (this._skill2Level == 2) {
            var options = {hp: 300, arm: 45, forceHigh: 15, forceLow: 10, guardX: this._guardX, guardY: this._guardY};
        } else {
            var options = {hp: 350, arm: 50, forceHigh: 20, forceLow: 15, guardX: this._guardX, guardY: this._guardY};
        }
        this._blackImpermanence = <BlackImpermanence>application.pool.get("BlackImpermanence", options);
        this._blackImpermanence.setCenterX(this.getMuzzleX());
        this._blackImpermanence.setCenterY(this.getMuzzleY());

        this._blackImpermanence.setCreator(this);

        application.battle.addSoldier(this._blackImpermanence);
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        this._blackImpermanence = soldier.clone({idleTicks: application.frameRate * 12});
        application.battle.addSoldier(this._blackImpermanence);
        this._blackImpermanence.setCreator(this);
        return this._blackImpermanence;
    }
    
    protected _fighting() {
        super._fighting();
        
        if (this._skill1Ticks >= application.frameRate * 12 && this._skill1Level > 0 && this._enemy) {
            this._skill1Ticks = 0;
            
            if (this._skill1Level == 1) {
                var fightingTicks = 4;
            } else if (this._skill1Level == 2) {
                var fightingTicks = 5;
            } else {
                var fightingTicks = 6;
            }
            
            let bullet = <Bullet>application.pool.get("BlackWater",  {hitRaduis: this._guardRadius, fightingTicks: fightingTicks * application.frameRate});
            bullet.setShooter(this);
            bullet.fight();
            application.battle.addBullet(bullet);
        }
        
        this._skill1Ticks ++;
    }
    
    public getMuzzleX(): number {
        return this.x + 40;
    }

    public getMuzzleY(): number {
        return this.y + 15;
    }
    
    public targetKilled(target:NPC) {
        if (target.getMaxHp() < 500) {
            if (this._blackImpermanence && this._blackImpermanence.active()){
                var soldier = <Soldier>application.pool.get("Ghost", {guardX: target.getCenterX(), guardY: target.getBottomY(), forceLow:2, forceHigh:9, arm:20});
            } else {
                var soldier = <Soldier>application.pool.get("Ghost", {guardX: target.getCenterX(), guardY: target.getBottomY()});
            }
        } else {
            if (this._blackImpermanence && this._blackImpermanence.active()){
                var soldier = <Soldier>application.pool.get("WhiteImpermanence", {guardX: target.getCenterX(), guardY: target.getBottomY(), forceLow:3, forceHigh:15, arm:40});
            } else {
                var soldier = <Soldier>application.pool.get("WhiteImpermanence", {guardX: target.getCenterX(), guardY: target.getBottomY()});
            }            
        }
        
        soldier.setCenterX(target.getCenterX());
        soldier.setBottomY(target.getBottomY());
        application.battle.addSoldier(soldier);
    }
}
