module router {
    export var app: Main;

    export function init(main:Main){
        app = main;
    }

    export function changePage(page:eui.Component){
        app.removeChildren();
        app.addChild(page);
    }
}