var GuideUI = (function (_super) {
    __extends(GuideUI, _super);
    function GuideUI() {
        var _this = this;
        _super.call(this);
        this.step = 0;
        this.skinName = "resource/custom_skins/guideUISkin.exml";
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.over();
        }, this);
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            if ((event.target.currentCount) % 2 == 0) {
                this.imgFinger.x -= 10;
            }
            else {
                this.imgFinger.x += 10;
            }
        }, this);
        this.timer.start();
    }
    var d = __define,c=GuideUI,p=c.prototype;
    p.setOverCallback = function (ocb) {
        this.overCallback = ocb;
    };
    p.next = function () {
        this.step++;
        switch (this.step) {
            case 1:
                this.renderStep1();
                break;
            case 2:
                this.renderStep2();
                break;
            case 3:
                this.renderStep3();
                break;
            case 4:
                this.renderStep4();
                break;
            case 5:
                this.renderStep5();
                break;
            case 6:
                this.over();
                break;
        }
    };
    p.renderStep1 = function () {
        this.renderBlock(200, 200, 200, 200);
    };
    p.renderStep2 = function () {
        this.renderBlock(100, 0, 200, 200);
    };
    p.renderStep3 = function () {
        this.renderBlock(0, 300, 200, 200);
    };
    p.renderStep4 = function () {
        this.renderBlock(330, 300, 200, 200);
    };
    p.renderStep5 = function () {
        this.renderBlock(340, 300, 200, 200);
    };
    p.renderBlock = function (x, y, width, height) {
        this.rcRight.x = x + width;
        this.rcRight.y = 0;
        this.rcRight.height = 800;
        this.rcRight.width = 480 - this.rcRight.x;
        this.rcTop.x = this.rcTop.y = 0;
        this.rcTop.height = y;
        this.rcTop.width = this.rcRight.x;
        this.rcMiddle.x = 0;
        this.rcMiddle.y = y;
        this.rcMiddle.width = y;
        this.rcMiddle.height = height;
        this.rcBottom.x = 0;
        this.rcBottom.y = y + height;
        this.rcBottom.width = this.rcTop.width;
        this.rcBottom.height = this.rcRight.height - y - height;
    };
    p.over = function () {
        application.hideUI(this);
        application.guideUI = null;
        this.timer.stop();
        if (this.overCallback) {
            this.overCallback();
        }
    };
    return GuideUI;
}(eui.Component));
egret.registerClass(GuideUI,'GuideUI');
