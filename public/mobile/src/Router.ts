class Router {
    private _main: Main;

    constructor(main: Main) {
        this._main = main;
    }
    
    public changePage(page:eui.Component){
        this._main.removeChildren();
        this._main.addChild(page);
    }
}