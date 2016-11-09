class BombTower extends ShootTower {
    public initialize(properties:any) {
        super.initialize(properties);
        
        if (this._skill) {
            if (this._skill.attris.level == 2) {
                this._hitSpeed = Math.round(this._hitSpeed * 1.05);
            }

            if (this._skill.attris.level == 3) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }

            if (this._skill.attris.level == 4) {
                this._critical += 10;
            }

            if (this._skill.attris.level == 5) {
                this._guardRadius = Math.round(1.05 * this._guardRadius);
            }

            if (this._skill.attris.level == 6) {
                this._forceHigh = Math.round(1.1 * this._forceHigh);
                this._forceLow  = Math.round(1.1 * this._forceLow);
            }                
        }
    }
    
    protected _shoot() {
        if (this._skill & this._skill.attrs.level == 1 && this._enemy && this._enemy.active()) {
            this._enemy.dizzy(0, application.frameRate, false, false);
        }
        
        super._shoot();
    }    
}
