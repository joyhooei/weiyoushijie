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
        self.refresh(application.customer.gold, application.customer.diamond, application.customer.output, 0, null);
        self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
        self.renderTotalHits();
        self.renderProjects();
        self.renderBid();
        self.renderBeauty();
        self.lblHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onHit();
        }, this);
        self.btnHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onHit();
        }, this);
        self.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new GiftUI());
        }, this);
        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showHelp("");
        }, this);
        self.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500, null, null, 0));
        }, this);
        self.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.charge();
        }, this);
        self.imgCharge.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            if (application.customer.charge == 0) {
                application.showUI(new FirstChargeBonusUI());
            }
            else {
                application.charge();
            }
        }, this);
        /// 首次加载完成首先显示home
        self.gotoHome();
        self.renderOfflineGold();
        self.earnGoldDynamically();
    };
    p.earnGoldDynamically = function () {
        var seconds = 5;
        var timer = new egret.Timer(seconds * 1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            this.earnGold(seconds);
        }, this);
        timer.start();
    };
    p.renderTotalHits = function () {
        var self = this;
        var timer = new egret.Timer(1000 * 60 * 60 * 4, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            application.dao.rest("hits", { customer_id: application.customer.id }, function (succeed, result) {
                if (succeed) {
                    application.customer.total_hits = result.hits;
                    self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
                }
            });
        }, this);
        timer.start();
    };
    //中午12点需要刷新拍卖数据
    p.refreshBid = function () {
        var self = this;
        var timer = new egret.Timer(1000 * 60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            var dt = new Date();
            if (dt.getHours() == 12) {
                self.renderBid();
                application.refreshBid(function (bid) {
                    if (bid) {
                        self.refresh(0 - bid.gold, 0, 0, 0, null);
                    }
                });
            }
        }, this);
        timer.start();
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
        self.projectItems = new Array();
        self.grpProject.removeChildren();
        application.dao.fetch("Project", { customer_id: application.customer.id }, { order: 'sequence asc' }, function (succeed, projects) {
            if (succeed && projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    self.renderProject(projects[i]);
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
        self.addChildAt(self.mcBeauty, 1);
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.onBeauty();
        }, this);
    };
    p.renderOfflineGold = function () {
        if (application.customer.offline_gold > 0) {
            var ui = new OfflineGoldUI(application.customer.offline_gold, application.customer.offline_hours.toString(), application.customer.offline_minutes.toString());
            ui.horizontalCenter = 0;
            ui.verticalCenter = 0;
            this.addChild(ui);
        }
    };
    p.onBeauty = function () {
        this.mcBeauty.play(3);
        this.earnGold(1);
    };
    p.earnGold = function (second) {
        var gold = this.getOutput() * second;
        application.customer.gold += gold;
        this.animateStep(this.lblGold, application.usableGold() - gold, application.usableGold());
        application.dao.save("Customer", application.customer, null);
    };
    p.onHit = function () {
        var self = this;
        if (self.hit > 0) {
            return;
        }
        if (application.customer.total_hits > 0) {
            application.customer.total_hits -= 1;
            application.dao.save("Customer", application.customer, null);
            self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
            self.hit = 59;
            self.lblOutput.text = application.format(self.getOutput());
            var timer = new egret.Timer(1000, 59);
            timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                self.lblHit.text = self.hit.toString();
                if (self.hit > 0) {
                    self.hit = self.hit - 1;
                }
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
    p.refresh = function (goldAdded, diamondAdded, outputAdded, totalHits, projEdited) {
        if (goldAdded != 0) {
            this.animateStep(this.lblGold, application.usableGold() - goldAdded, application.usableGold());
        }
        if (diamondAdded != 0) {
            this.animateStep(this.lblDiamond, application.customer.diamond - diamondAdded, application.customer.diamond);
        }
        if (outputAdded != 0) {
            this.animateStep(this.lblOutput, this.getOutput() - outputAdded, this.getOutput());
        }
        if (totalHits != 0) {
            this.lblTotalHits.text = "x" + totalHits.toString();
        }
        if (application.customer.charge > 0) {
            this.imgCharge.source = "charge_png";
        }
        this.renderProject(projEdited);
    };
    p.renderProject = function (proj) {
        if (proj) {
            var i = proj.sequence;
            if (i < this.projectItems.length) {
                this.projectItems[i].refresh(proj);
            }
            else {
                var item = new ProjectItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
                this.projectItems[i] = item;
                this.grpProject.addChildAt(item, i);
            }
        }
    };
    p.gotoHome = function () {
        this._uiFocused = null;
        this.selectFooter(this.btnHome);
    };
    p.gotoTool = function () {
        var _this = this;
        if (!this._toolUI) {
            this._toolUI = new ToolUI();
            this._toolUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.gotoPage(GamePages.HOME, true);
            }, this);
        }
        this._uiFocused = this._toolUI;
        this.selectFooter(this.btnTool);
    };
    p.gotoRank = function () {
        var _this = this;
        if (!this._rankUI) {
            this._rankUI = new RankUI();
            this._rankUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.gotoPage(GamePages.HOME, true);
            }, this);
        }
        this._uiFocused = this._rankUI;
        this.selectFooter(this.btnRank);
    };
    p.gotoAuction = function () {
        var _this = this;
        if (!this._auctionUI) {
            this._auctionUI = new AuctionUI();
            this._auctionUI.addEventListener(GameEvents.EVT_RETURN, function () {
                _this.gotoPage(GamePages.HOME, true);
            }, this);
        }
        else {
            this._auctionUI.refresh();
        }
        this._uiFocused = this._auctionUI;
        this.selectFooter(this.btnAuction);
    };
    p.btnHandler = function (evt) {
        /// 已经选中不应当再处理!
        if (evt.currentTarget == this._btnFocused) {
            this._btnFocused.selected = true;
            return;
        }
        switch (evt.currentTarget) {
            case this.btnHome:
                this.gotoPage(GamePages.HOME, true);
                break;
            case this.btnRank:
                this.gotoPage(GamePages.RANK, false);
                break;
            case this.btnTool:
                this.gotoPage(GamePages.TOOL, false);
                break;
            case this.btnAuction:
                this.gotoPage(GamePages.AUCTION, false);
                break;
        }
    };
    p.resetFocus = function () {
        if (this._uiFocused) {
            if (this._uiFocused.parent) {
                this._uiFocused.parent.removeChild(this._uiFocused);
            }
            this._uiFocused = null;
        }
        if (this._btnFocused) {
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
            this._btnFocused = null;
        }
    };
    p.gotoPage = function (pageName, pageReady) {
        this._pageFocused = pageName;
        this.resetFocus();
        switch (pageName) {
            case GamePages.HOME:
                this.gotoHome();
                return;
            case GamePages.RANK:
                if (this._rankUI || pageReady) {
                    this.gotoRank();
                }
                else {
                    this.loadPage();
                }
                break;
            case GamePages.TOOL:
                if (this._toolUI || pageReady) {
                    this.gotoTool();
                }
                else {
                    this.loadPage();
                }
                break;
            case GamePages.AUCTION:
                if (this._auctionUI || pageReady) {
                    this.gotoAuction();
                }
                else {
                    this.loadPage();
                }
                break;
        }
        if (this._uiFocused) {
            this._uiFocused.horizontalCenter = 0;
            this._uiFocused.verticalCenter = 0;
            this.addChild(this._uiFocused);
        }
    };
    p.loadPage = function () {
        this.enableFooter(false);
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    };
    p.pageReadyHandler = function (pageName) {
        this.enableFooter(true);
        this.gotoPage(pageName, true);
        this.addChild(this._uiFocused);
    };
    p.selectFooter = function (btn) {
        if (this._btnFocused) {
            this._btnFocused.selected = false;
        }
        this._btnFocused = btn;
        this._btnFocused.selected = true;
    };
    p.enableFooter = function (enabled) {
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].enabled = enabled;
        }
    };
    return HomeUI;
}(eui.Component));
egret.registerClass(HomeUI,'HomeUI');
