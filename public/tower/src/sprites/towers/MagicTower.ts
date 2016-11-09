class MagicTower extends ShootTower {
    public initialize(properties:any) {
        super.initialize(properties);
        
        if (this._skill) {
            if (this._skill.attrs.level == 5) {
                this._guardRadius = Math.round(this._guardRadius * 1.05);
            }
        }
    } 
}
