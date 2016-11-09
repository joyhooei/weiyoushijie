class ArrowTower extends ShootTower {
    public initialize(properties:any) {
        super.initialize(properties);
        
        if (this._skill) {
            if (this._skill.attris.level == 1) {
                this._guardRadius = Math.round(1.05 * this._guardRadius);
            }

            if (this._skill.attris.level == 3) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }

            if (this._skill.attris.level == 4) {
                this._guardRadius = Math.round(1.05 * this._guardRadius);
                this._forceHigh   = Math.round(1.05 * this._forceHigh);
                this._forceLow    = Math.round(1.05 * this._forceLow);
            }

            if (this._skill.attris.level == 6) {
                this._forceHigh = Math.round(1.1 * this._forceHigh);
                this._forceLow  = Math.round(1.1 * this._forceLow);
            }                
        }
    }
    
    protected _findEnemy(): Enemy {
        return application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
    }
}
