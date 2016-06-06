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
        this.imgBonus.visible = false;
        this.timer.start();
    }
    var d = __define,c=GuideUI,p=c.prototype;
    p.setOverCallback = function (ocb) {
        this.overCallback = ocb;
    };
    p.next = function () {
        switch (this.step) {
            case 1:
                this.click++;
                if (this.click == 5) {
                    this.step++;
                    break;
                }
                else {
                    return;
                }
            default:
                this.step++;
                break;
        }
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
                this.renderStep6();
                break;
            case 7:
                this.renderStep7();
                break;
            case 8:
                this.renderStep8();
                break;
        }
    };
    //点击美女
    p.renderStep1 = function () {
        this.click = 0;
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G1_png";
        this.imgFinger.x = 90;
        this.imgFinger.y = 340;
    };
    //购买运营
    p.renderStep2 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G2_png";
        this.imgFinger.x = 90;
        this.imgFinger.y = 380;
    };
    //升级运营
    p.renderStep3 = function () {
        this.imgSpeak.source = "G3_png";
    };
    //拍卖
    p.renderStep4 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G4_png";
        this.imgBg.y -= 100;
        this.imgSpeak.y -= 100;
    };
    //滑动投标金币
    p.renderStep5 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G5_png";
    };
    //投标
    p.renderStep6 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G6_png";
        this.imgSpeak.y -= 100;
        this.imgBg.y -= 100;
    };
    //总结
    p.renderStep7 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G7_png";
        this.imgFinger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.next();
        }, this);
    };
    //获取奖励
    p.renderStep8 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G8_png";
        this.imgFinger.visible = false;
        this.imgBonus.visible = true;
        this.imgBonus.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.customer.metal += 1;
            application.customer.diamond += 500;
            application.saveCustomer();
            this.over();
        }, this);
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
