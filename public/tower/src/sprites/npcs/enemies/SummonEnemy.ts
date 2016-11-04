class SummonEnemy extends Enemy {
    protected _summonTicks: number;
    protected _summonClaz: string;
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
        this._summonClaz  = this._get(properties, "summonClaz", "Enemy27");
    }
    
    protected _moving() {
        super._moving();
        
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            this._summon(this._summonClaz);
        }
    }
    
    protected _summon(claz:string): Enemy {
        return this._born(claz, this.x, this.y);
    }
}
