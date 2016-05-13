var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this);
        this.hit = 0;
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
        self.imgAvatar.source = application.customer.avatar;
        self.animateCustomer(0 - application.customer.gold, 0 - application.customer.diamond, application.customer.output, null);
        self.renderTotalHits();
        self.renderTotalHitsAllTime();
        self.renderProjects();
        self.renderBid();
        self.renderBeauty();
        self.renderOfflineGold();
        self.lblHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onHit();
        }, this);
        self.btnHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onHit();
        }, this);
        self.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onGift();
        }, this);
        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onHelp();
        }, this);
        /// 首次加载完成首先显示home
        self.goHome();
    };
    p.onGift = function () {
        var ui = new GiftUI();
        ui.horizontalCenter = 0;
        ui.verticalCenter = 0;
        this.addChild(ui);
    };
    p.onHelp = function () {
    };
    p.renderTotalHitsAllTime = function () {
        var self = this;
        var timer = new egret.Timer(1000 * 60 * 60 * 4, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            self.renderTotalHits();
        }, this);
        timer.start();
    };
    p.renderTotalHits = function () {
        var self = this;
        application.dao.rest("hits", { customer_id: application.customer.id }, function (succeed, result) {
            if (succeed && result.hits > 0) {
                application.customer.total_hits = result.hits;
                self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
            }
        });
    };
    p.renderBid = function () {
        var self = this;
        application.dao.fetch("Bid", { succeed: 1 }, { limit: 1, order: 'create_time desc' }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                application.dao.fetch("Customer", { id: bids[0].customer_id }, { limit: 1 }, function (succeed, customers) {
                    if (succeed && customers.length > 0) {
                        self.lblBidName.text = customers[0].name;
                        self.lblBidGold.text = application.format(bids[0].gold);
                        self.imgBidAvatar.source = customers[0].avatar;
                    }
                });
            }
        });
    };
    p.renderProjects = function () {
        var self = this;
        self.grpProject.removeChildren();
        application.dao.fetch("Project", { customer_id: application.customer.id }, { order: 'sequence asc' }, function (succeed, projects) {
            if (succeed && projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    self.addProject(projects[i]);
                }
            }
        });
    };
    p.renderBeauty = function () {
        var self = this;
        var data = RES.getRes("animation_json");
        var txtr = RES.getRes("animation_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        self.mcBeauty = new egret.MovieClip(mcFactory.generateMovieClipData(""));
        self.mcBeauty.x = 70;
        self.mcBeauty.y = 90;
        self.addChild(self.mcBeauty);
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onBeauty();
        }, this);
    };
    p.renderOfflineGold = function () {
        var self = this;
        application.dao.rest("offline_gold", { customer_id: application.customer.id }, function (succeed, result) {
            if (succeed && result.gold > 0) {
                var ogui = new OfflineGoldUI(result.gold, result.hours.toString(), result.minutes.toString());
                ogui.horizontalCenter = 0;
                ogui.verticalCenter = 0;
                self.addChild(ogui);
            }
        });
    };
    p.onBeauty = function () {
        var self = this;
        self.mcBeauty.play(3);
        application.customer.gold += self.getOutput();
        application.dao.save("Customer", application.customer, null);
        self.animateStep(self.lblGold, application.customer.gold + application.customer.output, application.customer.gold);
    };
    p.onHit = function () {
        var self = this;
        if (application.customer.total_hits > 0) {
            application.customer.total_hits -= 1;
            application.dao.save("Customer", application.customer, null);
            self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
            self.hit = 59;
            self.lblOutput.text = application.format(self.getOutput());
            var timer = new egret.Timer(1000, 60);
            timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                self.lblHit.text = self.hit.toString();
                self.hit = self.hit - 1;
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
                self.hit = 0;
                self.lblHit.text = "59";
                self.lblOutput.text = application.format(application.customer.output.toString());
            }, this);
            timer.start();
        }
        else {
            Toast.launch("暂时没有奋力一击");
        }
    };
    p.getOutput = function () {
        if (this.hit > 0) {
            return application.customer.output * 99;
        }
        else {
            return application.customer.output;
        }
    };
    p.animateStep = function (lbl, from, to) {
        if (from == to) {
            return;
        }
        var step = Math.min(Math.abs(from - to), 20);
        var delta = (to - from) / step;
        var timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            lbl.text = application.format(Math.round(from + delta * event.target.currentCount));
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
            lbl.text = application.format(to);
        }, this);
        timer.start();
    };
    p.animateCustomer = function (gold, diamond, output, proj) {
        this.animateStep(this.lblGold, application.customer.gold + gold, application.customer.gold);
        this.animateStep(this.lblDiamond, application.customer.diamond + diamond, application.customer.diamond);
        this.animateStep(this.lblOutput, this.getOutput() - output, this.getOutput());
        this.addProject(proj);
    };
    p.addProject = function (proj) {
        if (proj) {
            var i = proj.sequence;
            var item = new ProjectItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
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
        this._btnFocused = this.btnHome;
        this.btnHome.selected = true;
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
        this.btnTool.selected = true;
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
        this.btnRank.selected = true;
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
        else {
            this._auctionUI.refresh();
        }
        this._uiFocused = this._auctionUI;
        this.btnAuction.selected = true;
    };
    p.btnHandler = function (evt) {
        /// 已经选中不应当再处理!
        if (evt.currentTarget == this._btnFocused) {
            this._btnFocused.selected = true;
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
        this._btnFocused.selected = true;
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
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].enabled = true;
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
        this.addChild(this._uiFocused);
    };
    return HomeUI;
}(eui.Component));
egret.registerClass(HomeUI,'HomeUI');
