var ToolItem = (function (_super) {
    __extends(ToolItem, _super);
    function ToolItem(myProject, project, iconName, titleName) {
        var _this = this;
        _super.call(this);
        this._project = project;
        this._myProject = myProject;
        this.skinName = "resource/custom_skins/toolItemSkin.exml";
        this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(100, 1);
        }, this);
        this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(900, 10);
        }, this);
        this.imgReset.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.reset();
        }, this);
        application.dao.addEventListener("Project", function (ev) {
            var myProject = ev.data;
            if (myProject.id == this._myProject.id) {
                this.myProject = myProject;
                this.refresh();
            }
        }, this);
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
        this.refresh();
    }
    var d = __define,c=ToolItem,p=c.prototype;
    p.refresh = function () {
        this.lbl1.text = application.format(this._myProject.tool_ratio);
        this.lbl100.text = application.format(this.ratio(this._myProject.tool_ratio, 1));
        this.lbl900.text = application.format(this.ratio(this._myProject.tool_ratio, 10));
    };
    p.reset = function () {
        if (this._myProject.tool_ratio > 1) {
            var boughts = 0;
            var ratio = 1;
            while (ratio < this._myProject.tool_ratio) {
                boughts++;
                ratio = this.ratio(1, boughts);
            }
            var diamond = 630 * Math.floor(boughts / 10) + 70 * (boughts % 10);
            application.showUI(new ResetUI(this._myProject, this._project, diamond));
        }
        else {
            Toast.launch('还没有购买过金手指，不能重置');
        }
    };
    p.buy = function (price, step) {
        if (application.customer.diamond >= price) {
            var oldOutput = this.output();
            this._myProject.tool_ratio = this.ratio(this._myProject.tool_ratio, step);
            application.buyOutput(0, price, this.output() - oldOutput);
            application.dao.save("Project", this._myProject);
            application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了金手指", price);
            Toast.launch("成功购买了金手指");
            this.refresh();
        }
        else {
            application.showUI(new ChargeTipUI());
        }
    };
    //购买一次的倍数
    p.ratioOne = function (oldRatio) {
        var ratios = [
            1,
            5,
            50,
            200,
            2000,
            10000,
            100000,
            500000,
            5000000,
            25000000,
            125000000,
            625000000,
            5000000000,
            40000000000,
            200000000000
        ];
        var i = application.log10(oldRatio);
        if (i < ratios.length) {
            return oldRatio + ratios[i];
        }
        else {
            var delta = ratios[ratios.length - 1];
            for (var j = 0; j < (i - ratios.length); j++) {
                delta = delta * 10;
            }
            return oldRatio + delta;
        }
    };
    //购买十次的倍数
    p.ratio = function (oldRatio, step) {
        for (var i = 0; i < step; i++) {
            oldRatio = this.ratioOne(oldRatio);
        }
        return oldRatio;
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    };
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
