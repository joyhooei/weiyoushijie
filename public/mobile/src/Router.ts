module router {
    export var app: Main;

    export function init(main:Main){
        app = main;
    }

    export function changePage(page:egret.Component){
        app.removeAllChildren();
        app.addChild(page);
    }
}