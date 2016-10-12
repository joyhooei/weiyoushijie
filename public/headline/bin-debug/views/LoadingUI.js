var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.textField = new egret.TextField();
        this.textField.textColor = 0XFFFFFF;
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.addChild(this.textField);
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.setProgress = function (current, total) {
        this.textField.text = "加载..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
