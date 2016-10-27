class Magic4 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic4_fighting", "fighting")
            .addAllClips("magic4_building", "building");
    }

    protected _hitTarget() {
        if (this._target.active()) {
            if (this._target.shootBy(this)) {
                //target is dead
                let ghost:Ghost = <Ghost>application.pools.get("Ghost");
                ghost.setCenterX(this._target.getCenterX());
                ghost.setBottomY(this._target.getBottomY());
                application.battle.addSoldier(ghost);
            }
        }
    }   
}
