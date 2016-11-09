class Bomb extends CastBullet {
    protected _hitRadius: number;

    protected _skill: Skill;
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
        
        this._skill = Skill.get("BombTower", 0);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getBottomY(), this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
           if (this._skill && this._skill.attrs.level == 4 && Math.random() <= 0.1) {
               enemies[i].kill();
           } else {
               enemies[i].shootBy(this);
           }
        }
    }

    protected _act():boolean {
        if (this._state == EntityState.building) {
            this.move();
            return false;
        }

        return super._act();
    }
}
