class MagicTower4 extends MagicTower implements SoldierCreator {
    private _soldier : Soldier;
    
    private _skill1Level: number;
    
    private _skill2Level: number;
    
    public constructor() {
        super();
        
        this.addBitmap("magictower4_png");

        this._bulletClaz = "Magic4";
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._skill1Level = 1;
        this._skill2Level = 1;
        
        this._soldier = null;
    }
    
    public guard() {
        super.guard();
        
        if (!this._soldier) {
            this._addSoldier();
        }
    }
    
    public upgrade(skill:number) {
        if (skill == 1) {
            if (this._skill1Level == 1) {
                var price = 325;
            } else {
                var price = 200;
            }
            
            this._skill1Level ++;
        } else {
            if (this._skill1Level == 1) {
                var price = 300;
            } else {
                var price = 150;
            }
            
            this._skill2Level ++;
        }
        
        application.battle.incGolds(-price);
        
        this._soldier.erase();
        this._addSoldier();
    }
    
    private _addSoldier() {
        if (this._skill2Level == 1) {
            var options = {hp: 250, arm: 40, forceHigh: 10, forceLow: 5, guardX: this._guardX, guardY: this._guardY};
        } else if (this._skill2Level == 2) {
            var options = {hp: 300, arm: 45, forceHigh: 15, forceLow: 10, guardX: this._guardX, guardY: this._guardY};
        } else {
            var options = {hp: 350, arm: 50, forceHigh: 20, forceLow: 15, guardX: this._guardX, guardY: this._guardY};
        }
        this._soldier = <Soldier>application.pool.get("BlackImpermanence", options);
        this._soldier.setCenterX(this.getMuzzleX());
        this._soldier.setCenterY(this.getMuzzleY());

        this._soldier.setCreator(this);

        application.battle.addSoldier(this._soldier);
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(application.frameRate * 12);
        this._addSoldier(s);

        return s;
    }
    
    protected _shoot() {
        if (this._skill2Level == 1) {
            var fightTicks = 4;
        } else if (this._skill2Level == 2) {
            var fightTicks = 5;
        } else {
            var fightTicks = 6;
        }        
        Bullet.throw(this, this.getMuzzleX(), this.getMuzzleY(), this._bulletClaz, {force: 20, fightTicks: fightTicks * application.frameRate});
    }
    
    public getMuzzleX(): number {
        return this.x + 40;
    }

    public getMuzzleY(): number {
        return this.y + 15;
    }
    
    public targetKilled(target:NPC) {
        var props = {guardX: target.getCenterX(), guardY: target.getBottomY()};
        
        if (target.getMaxHp() < 500) {
            if (this._soldier.alive()){
                props.forceLow = 2;
                props.forceHigh = 9;
                props.arm = 20;
            }
            
            var soldier = <Soldier>application.pools.get("Ghost", props);
        } else {
            if (this._soldier.alive()){
                props.forceLow = 3;
                props.forceHigh = 15;
                props.arm = 40;
            }
            
            var soldier = <Soldier>application.pools.get("WhiteImpermanence", props);
        }
        
        soldier.setCenterX(target.getCenterX());
        soldier.setBottomY(target.getBottomY());
        application.battle.addSoldier(soldier);
    }
}
