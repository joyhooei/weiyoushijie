class GiftUI extends eui.Component {
    private imgPick1: eui.Image;
    private imgPick2: eui.Image;
    private imgPick3: eui.Image;
    private imgPick4: eui.Image;
    private imgPick5: eui.Image;
    private imgPick6: eui.Image;
    
    private imgRet: eui.Image;
    
    private gifts: any[];

    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);

        this.skinName = "resource/custom_skins/giftUISkin.exml";

        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.back();
        },this);	
        
        this.imgPick1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this.pick(0, this.imgPick1);
        },this);
        this.imgPick2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.pick(1,this.imgPick2);
        },this);
        this.imgPick3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.pick(2,this.imgPick3);
        },this);
        this.imgPick4.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.pick(3,this.imgPick4);
        },this);
        this.imgPick5.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.pick(4,this.imgPick5);
        },this);
        this.imgPick6.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.pick(5,this.imgPick6);
        },this);
    }

    public refresh(): void {
        this.uiCompHandler();
    }

    private uiCompHandler(): void {
        var self = this;

        application.dao.fetch("Gift", {customer_id: application.customer.id}, {order : 'category ASC'}, function(succeed, gifts){
            self.setImage(self.imgPick1,gifts[0]);
            self.setImage(self.imgPick2,gifts[1]);
            self.setImage(self.imgPick3,gifts[2]);
            self.setImage(self.imgPick4,gifts[3]);
            self.setImage(self.imgPick5,gifts[4]);
            self.setImage(self.imgPick6,gifts[5]);
            
            self.gifts = gifts;
        })
    }
    
    private setImage(imgPic: eui.Image, gift:any) {
        if(gift.locked == 1) {
            imgPic.source = "unpick_png";
        } else if(gift.locked == 0) {
            imgPic.source = "pick_png";
        } else {
            imgPic.source = "picked_png";
        }
    }
    
    private pick(index: number,imgPic: eui.Image) {
        var self = this;
        
        var gift = this.gifts[index];
        if(gift.locked == 0) {
            gift.locked = 2;
            application.dao.save("Gift", gift, null);
            
            application.customer.metal += gift.metal;
            application.customer.gold  += gift.gold;
            application.customer.diamond += gift.diamond;
            
            application.dao.save("Customer",application.customer,function(succeed,c) {
                if(succeed) {
                    application.refreshCustomer(-gift.gold, -gift.diamond, 0,0,null);
                    
                    self.setImage(imgPic, gift);
                }
            });
        }
    }

    private back(): void {
        this.parent.removeChild(this);
    }
}