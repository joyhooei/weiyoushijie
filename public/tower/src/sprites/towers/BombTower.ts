class BombTower extends RemoteHitTower {
    public constructor() {
        super();
    }

    protected _createBullet():Bullet {
        return <Bullet>application.pool.get("Bomb");
    }
}
