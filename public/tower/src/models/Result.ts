class Result {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Result", this.attrs);
    }
}
