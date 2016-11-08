class Army {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Army", this.attrs);
    }
}
