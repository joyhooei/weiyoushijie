class Hero extends Soldier {   
    //技能数据
    protected _skills: Skill[];

    //当前施展技能
    protected _curSkill: number;

    //额外打击
    protected _extraForce: number;
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._extraForce = 0;
        
        this._curSkill = 0;
    }
    
    public setSkill(skills: Skill[]) {
        this._skills = skills;
    }

    public getForce(): number {
        return super.getForce() + this._extraForce;
    }

	protected _render(xDelta = 0, yDelta = 0, idx = 0): egret.DisplayObject {
		this._centerHp();
		
		return super._render(0, 5, this._curSkill);
	}
}
