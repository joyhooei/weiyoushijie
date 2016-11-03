class ShootEnemy extends Enemy implements Shooter {
    public constructor() {
        super();
    }
    
    public targetKilled(target:NPC) {
    }
    
    public getMuzzleX(): number {
        it (this._target.x > this.x) {
            return this.x + this.width;
        } else {
            return this.x;
        }
    }
    
    public getMuzzleY(): number {
        return this.y;
    }
}
