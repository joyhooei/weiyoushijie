class BombTower extends ShootTower {
    protected getMuzzleX(): number {
        return this.getCenterX() - 8;
    }
}
