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
            if (this._skill2Level == 1) {
                var options = {hp: 250, arm: 40, forceHigh: 10, forceLow: 5, guardX: this._guardX, guardY: this._guardY};
            } else if (this._skill2Level == 1) {
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
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(application.frameRate * 12);
        this._addSoldier(s);

        return s;
    }
    
    public getMuzzleX(): number {
        return this.x + 40;
    }

    public getMuzzleY(): number {
        return this.y + 15;
    }
}
