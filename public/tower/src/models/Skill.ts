class Skill {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Skill", this.attrs);
    }
}
