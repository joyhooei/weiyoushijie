class Guard extends Soldier {
    //强壮
    public setCreator(creator: SoldierCreator) {
        if (creator) {
            let tower = <SoldierTower>creator;
            this.addMaxHp(50 * tower.getSkillLevel(1));
        }

        super.setCreator(creator);
    }

    //复活后拥有30%的血量
    public damage(d: number): boolean {
        if (this.active()) {           
            if (this._hp.damage(d)) {
                let tower = <SoldierTower>this._creator;
                if (tower.getSkillLevel(3) > 0) {
                    if (Math.random() <= 0.1 + 0.1 * tower.getSkillLevel(3)) {
                        this._hp.setHp(Math.round(this._hp.getMaxHp() * 0.3));
                        return false;
                    }
                }

                this.kill();
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    //有15%的几率使敌人流血3秒，可以叠加
    protected _hitOpponents() {
        super._hitOpponents();

        if (this._enemy && this._enemy.active()) {
            let tower = <SoldierTower>this._creator;
            if (tower.getSkillLevel(2) > 0) {
                if (Math.random() <= 0.15) {
                    this._enemy.attack(tower.getSkillLevel(2) * 15 + 10, 3 * application.frameRate, true);
                }
            }
        }
    }
}
