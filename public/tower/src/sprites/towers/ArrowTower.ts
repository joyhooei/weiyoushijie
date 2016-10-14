class ArrowTower extends ShootTower {
    protected getMuzzleX(): number {
        return this.getCenterX();
    }
}
