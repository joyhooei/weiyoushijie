interface SoldierCreator {
    createSoldier(soldier: Soldier): Soldier;

    active(): boolean;
}
