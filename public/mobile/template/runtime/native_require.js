
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/nest/nest.js",
	"bin-debug/Application.js",
	"bin-debug/Dao.js",
	"bin-debug/GameEvents.js",
	"bin-debug/GamePages.js",
	"bin-debug/Main.js",
	"bin-debug/Router.js",
	"bin-debug/euisys/AssetAdapter.js",
	"bin-debug/euisys/ThemeAdapter.js",
	"bin-debug/models/Project.js",
	"bin-debug/views/AboutUI.js",
	"bin-debug/views/GoodsUI.js",
	"bin-debug/views/HerosUI.js",
	"bin-debug/views/HomeUI.js",
	"bin-debug/views/LoadingUI.js",
	"bin-debug/views/LoginButton.js",
	"bin-debug/views/LoginUI.js",
	"bin-debug/views/ProfileUI.js",
	"bin-debug/views/Toast.js",
	"bin-debug/views/TrueLoadingUI.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};