enum SkillStype {
	hero = 0,
    battleHero,
    tower,
	battleTower
};

class Skill {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Skill", this.attrs);
    }

    public static getBattleHero(skills: Skill[]): Skill {
		for(let i = 0; i < skills.length; i++) {
			if (skills[i].attrs.style == SkillStype.battleHero) {
				return skills[i];
			}
		}
		
		return null;
	}
}
