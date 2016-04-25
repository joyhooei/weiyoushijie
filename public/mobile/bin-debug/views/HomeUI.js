var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this);
        this.projectTitles = ["测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试"];
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        self.btnHome.addEventListener(egret.TouchEvent.TOUCH_TAP, self.btnHandler, self);
        self.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, self.btnHandler, self);
        self.btnTool.addEventListener(egret.TouchEvent.TOUCH_TAP, self.btnHandler, self);
        self.btnAuction.addEventListener(egret.TouchEvent.TOUCH_TAP, self.btnHandler, self);
        self.btns = [self.btnHome, self.btnRank, self.btnTool, self.btnAuction];
        self.animateCustomer(0 - application.customer.gold, 0 - application.customer.diamond, application.customer.output, null);
        //显示项目
        self.grpProject.removeChildren();
        application.dao.fetch("Project", { customer_id: application.customer.id }, { order: 'sequence asc' }, function (succeed, projects) {
            if (succeed && projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    self.addProject(projects[i]);
                }
            }
        });
        application.dao.fetch("Bid", { succeed: 1 }, { limit: 1, order: 'create_time desc' }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                application.dao.fetch("Customer", { id: bids[0].customer_id }, { limit: 1 }, function (succeed, customers) {
                    if (succeed && customers.length > 0) {
                        self.lblBidName.text = customers[0].name;
                        self.lblBidGold.text = bids[0].gold;
                    }
                });
            }
        });
        var data = RES.getRes("animation_json");
        var txtr = RES.getRes("animation_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        self.mcBeauty = new egret.MovieClip(mcFactory.generateMovieClipData(""));
        self.mcBeauty.x = 60;
        self.mcBeauty.y = 90;
        self.addChild(self.mcBeauty);
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.mcBeauty.play(3);
            application.customer.gold += application.customer.output;
            application.dao.save("Customer", application.customer, null);
            self.animateStep(self.lblGold, application.customer.gold + application.customer.output, application.customer.gold);
        }, this);
        /// 首次加载完成首先显示home
        self.goHome();
    };
    p.animateStep = function (lbl, from, to) {
        if (from == to) {
            return;
        }
        var step = Math.min(Math.abs(from - to), 20);
        var delta = (to - from) / step;
        var timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            lbl.text = Math.round(from + delta * event.target.currentCount).toString();
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
            lbl.text = to.toString();
        }, this);
        timer.start();
    };
    p.animateCustomer = function (gold, diamond, output, proj) {
        this.animateStep(this.lblGold, application.customer.gold + gold, application.customer.gold);
        this.animateStep(this.lblDiamond, application.customer.diamond + diamond, application.customer.diamond);
        this.animateStep(this.lblOutput, application.customer.output - output, application.customer.output);
        this.addProject(proj);
    };
    p.addProject = function (proj) {
        if (proj) {
            var i = proj.sequence;
            var item = new ProjectItem(proj, application.projects[i], "pro" + (i + 1).toString() + "_png", this.projectTitles[i]);
            this.grpProject.addChildAt(item, i);
        }
    };
    p.resetFocus = function () {
        if (this._uiFocused) {
            if (this._uiFocused.parent) {
                this._uiFocused.parent.removeChild(this._uiFocused);
            }
            this._uiFocused = null;
        }
        if (this._btnFocused != null) {
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
            this._btnFocused = null;
        }
    };
    p.goHome = function () {
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.source = "MPB_png";
    };
    p.goTool = function () {
        var _this = this;
        if (!this._toolUI) {
            this._toolUI = new ToolUI();
            this._toolUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.resetFocus();
                _this.goHome();
            }, this);
        }
        this._uiFocused = this._toolUI;
    };
    p.goRank = function () {
        var _this = this;
        if (!this._rankUI) {
            this._rankUI = new RankUI();
            this._rankUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.resetFocus();
                _this.goHome();
            }, this);
        }
        this._uiFocused = this._rankUI;
    };
    p.goAuction = function () {
        var _this = this;
        if (!this._auctionUI) {
            this._auctionUI = new AuctionUI();
            this._auctionUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.resetFocus();
                _this.goHome();
            }, this);
        }
        this._uiFocused = this._auctionUI;
    };
    p.btnHandler = function (evt) {
        /// 已经选中不应当再处理!
        if (evt.currentTarget == this._btnFocused) {
            console.log(evt.currentTarget.name, "已经选中不应当再处理!");
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = false;
        }
        /// 移除上一焦点对应的按钮
        if (this._btnFocused) {
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if (this._uiFocused && this._uiFocused.parent) {
            this._uiFocused.parent.removeChild(this._uiFocused);
        }
        /// 设置当前焦点按钮
        this._btnFocused = evt.currentTarget;
        this._btnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;
        this._pageFocusedPrev = this._pageFocused;
        switch (this._btnFocused) {
            case this.btnHome:
                this._pageFocused = GamePages.HOME;
                break;
            case this.btnRank:
                this._pageFocused = GamePages.RANK;
                break;
            case this.btnTool:
                this._pageFocused = GamePages.TOOL;
                break;
            case this.btnAuction:
                this._pageFocused = GamePages.AUCTION;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    };
    p.pageReadyHandler = function (pageName) {
        /// 页面加载完成，所有非焦点按钮解锁
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = !this.btns[i].selected;
        }
        switch (pageName) {
            case GamePages.HOME:
                this.goHome();
                break;
            case GamePages.RANK:
                this.goRank();
                break;
            case GamePages.TOOL:
                this.goTool();
                break;
            case GamePages.AUCTION:
                this.goAuction();
                break;
        }
        /// 总是把页面放在背景的上一层！
        this.addChildAt(this._uiFocused, this.getChildIndex(this.imgBg) + 1);
    };
    return HomeUI;
}(eui.Component));
egret.registerClass(HomeUI,'HomeUI');
