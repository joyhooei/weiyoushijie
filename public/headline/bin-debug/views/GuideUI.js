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
        application.stopwatch.addEventListener("second", this.animateFinger, this);
        this.imgBonus.visible = false;
    }
    var d = __define,c=GuideUI,p=c.prototype;
    p.animateFinger = function (event) {
        if (event.data % 2 == 0) {
            if (this.imgFinger.source == "guideconti_png") {
                this.imgFinger.y -= 10;
            }
            else {
                this.imgFinger.x -= 10;
            }
        }
        else {
            if (this.imgFinger.source == "guideconti_png") {
                this.imgFinger.y += 10;
            }
            else {
                this.imgFinger.x += 10;
            }
        }
    };
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
        this.imgSpeak.source = "G1_png";
        this.imgFocus.source = "highlight1_png";
        this.renderBlock(0, 0, 480, 800);
        this.imgFinger.x = 345;
        this.imgFinger.y = 281;
        this.imgFocus.x = 78;
        this.imgFocus.y = 315;
        this.imgSpeak.x = 151;
        this.imgSpeak.y = 607;
        this.imgBg.x = 0;
        this.imgBg.y = 253;
    };
    //购买运营
    p.renderStep2 = function () {
        this.imgSpeak.source = "G2_png";
        this.imgFocus.source = "highlight2_png";
        this.renderBlock(0, 0, 480, 800);
        this.imgFinger.x = 308;
        this.imgFinger.y = 377;
        this.imgFocus.x = 206;
        this.imgFocus.y = 394;
        this.imgSpeak.x = 140;
        this.imgSpeak.y = 601;
    };
    //升级运营
    p.renderStep3 = function () {
        this.imgSpeak.source = "G3_png";
    };
    //拍卖
    p.renderStep4 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G4_png";
        this.imgFocus.source = "highlight3_png";
        this.imgFinger.x = 155;
        this.imgFinger.y = 671;
        this.imgFocus.x = 74;
        this.imgFocus.y = 702;
        this.imgSpeak.x = 139;
        this.imgSpeak.y = 597;
    };
    //滑动投标金币
    p.renderStep5 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G5_png";
        this.imgFinger.x = 44;
        this.imgFinger.y = 300;
        this.imgFocus.x = -34;
        this.imgFocus.y = 325;
        this.imgSpeak.x = 138;
        this.imgSpeak.y = 505;
        this.imgBg.x = 0;
        this.imgBg.y = 423;
    };
    //投标
    p.renderStep6 = function () {
        this.renderBlock(0, 0, 480, 800);
        this.imgSpeak.source = "G6_png";
        this.imgFocus.source = "highlight1_png";
        this.imgFinger.x = 226;
        this.imgFinger.y = 536;
        this.imgFocus.x = 4;
        this.imgFocus.y = 537;
        this.imgSpeak.x = 138;
        this.imgSpeak.y = 390;
        this.imgBg.x = 0;
        this.imgBg.y = 316;
    };
    //总结
    p.renderStep7 = function () {
        this.imgSpeak.source = "G7_png";
        this.imgFinger.source = "guideconti_png";
        this.imgFocus.visible = false;
        this.renderBlock(0, 0, 480, 800);
        this.imgFinger.x = 395;
        this.imgFinger.y = 679;
        this.imgSpeak.x = 138;
        this.imgSpeak.y = 599;
        this.imgBg.x = 0;
        this.imgBg.y = 523;
        this.imgFinger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.next();
        }, this);
    };
    //获取奖励
    p.renderStep8 = function () {
        this.imgSpeak.source = "G8_png";
        this.imgFinger.visible = false;
        this.imgBonus.visible = true;
        this.renderBlock(0, 0, 480, 800);
        this.imgBonus.x = 376;
        this.imgBonus.y = 653;
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
        application.stopwatch.removeEventListener("second", this.animateFinger, this);
        if (this.overCallback) {
            this.overCallback();
        }
    };
    return GuideUI;
}(eui.Component));
egret.registerClass(GuideUI,'GuideUI');
