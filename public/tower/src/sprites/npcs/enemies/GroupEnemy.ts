abstract class GroupEnemy extends Enemy {
    protected _group: Enemy[];

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._group = [];
    }

    private _existed(enemies: Enemy[], enemy: Enemy): boolean {
        for(let j = 0; j < enemies.length; j++) {
            if (enemy == enemies[j]) {
                return true;
            }
        }
        
        return false;
    }

    public update(): boolean {
        if (this.active()) {
            let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), 80, [-1, 0, 1]);
            
            for(let i = 0; i < enemies.length; i++) {
                let e = enemies[i];
                if (!this._existed(this._group, e)) {
                     this._enterGroup(e);
                }
            }
            
            for(let i = 0; i < this._group.length; i++) {
                let e = this._group[i];
                if (!this._existed(enemies, e)) {
                    if (e.active()) {
                        this._leaveGroup(e);
                    }
                }
            }
            
            this._group = enemies;
        } else {
            for(let i = 0; i < this._group.length; i++) {
                if (this._group[i].active()) {
                    this._leaveGroup(this._group[i]);
                }
            }
            
            this._group = [];
        }
        
        return super.update();
    }

    protected abstract _enterGroup(enemy: Enemy);
    protected abstract _leaveGroup(enemy: Enemy);
}
