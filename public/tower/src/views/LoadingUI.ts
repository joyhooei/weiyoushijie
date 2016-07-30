class LoadingUI extends egret.Sprite {
    private textField:egret.TextField;

    public constructor() {
        super();
        
        this.textField = new egret.TextField();
        this.textField.textColor = 0XFFFFFF;
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.addChild(this.textField);
    }

    public setProgress(current, total):void {
        this.textField.text = "加载..." + current + "/" + total;
    }
}
