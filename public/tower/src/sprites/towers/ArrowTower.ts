class ArrowTower extends ShootTower {
    protected _findEnemy(): Enemy {
        return application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
    }
}
