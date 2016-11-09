class MagicTower extends ShootTower {
    public initialize(properties:any) {
        super.initialize(properties);
        
        if (this._skill) {
            if (this._skill.attrs.level == 5) {
                this._guardRadius = Math.round(this._guardRadius * 1.05);
            }
        }
    }
    
    public getForce(): number {
		let force = super.getForce();
        
        if (this._skill && this._skill.attrs.level == 1) {
            let towers = application.battle.getMagicTowers();
            force += Math.round(force * 0.02 * towers.length);
        }
        
        return force;
    }    
}
