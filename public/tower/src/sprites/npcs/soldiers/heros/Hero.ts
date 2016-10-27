class Hero extends Soldier {   
    //技能数据
    protected _skill: Skill;

    //当前施展技能
    protected _curSkill: number;

    //额外打击
    protected _extraForce: number;
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._force = 0;
        
        this._curSkill = 0;
    }
    
    public setSkill(skill: Skill) {
        this._skill = skill;
    }

    public getForce(): number {
        return this._forceLow + Math.round(Math.random() * (this._forceHigh - this._forceLow)) + this._extraForce;
    }

	protected _render(xDelta = 0, yDelta = 0, idx = 0): egret.DisplayObject {
		this._centerHp();
		
		return super._render(0, 5, this._curSkill);
	}
}
