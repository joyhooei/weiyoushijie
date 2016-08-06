var Order = (function () {
    function Order() {
    }
    var d = __define,c=Order,p=c.prototype;
    Order.buy = function (customer, product, gid, price) {
        var firstCharge = customer.attrs.charge == 0;
        var order = { customer_id: customer.attrs.id, product: product, price: price, state: 0 };
        application.dao.save("Order", order).then(function (o) {
            customer.saveNow();
            application.channel.pay({ goodsId: gid, goodsName: gid, goodsNumber: "1", money: price, orderId: o.id }).then(function (data) {
            }, function (error) {
                Toast.launch(error);
            });
            Order.checkOrderPayed(customer, o, 20, firstCharge);
        }, function (error) {
            Toast.launch("保存订单失败，请稍后再试");
        });
    };
    Order.checkOrderPayed = function (customer, order, times, firstCharge) {
        Utility.delay(function () {
            application.dao.fetch("Order", { id: order.id, state: 1 }, {}).then(function (orders) {
                if (orders.length > 0) {
                    var o = orders[0];
                    if (o.product == "Diamond") {
                        var diamond = 400;
                        if (o.price == 5) {
                            diamond = 1200;
                        }
                        else if (o.price == 10) {
                            diamond = 2600;
                        }
                        else if (o.price == 30) {
                            diamond = 9000;
                        }
                        else if (o.price == 100) {
                            diamond = 36000;
                        }
                        else if (o.price == 500) {
                            diamond = 200000;
                        }
                        customer.attrs.diamond += diamond;
                        customer.saveNow();
                        if (firstCharge) {
                            Toast.launch("购买了" + diamond.toString() + "钻石,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            Gift.notify();
                        }
                        else {
                            Toast.launch("购买了" + diamond.toString() + "钻石");
                        }
                    }
                    else {
                        application.dao.fetch("Order", { customer_id: customer.attrs.id, "product": "Ticket", state: 1 }, {}).then(function (os) {
                            if (o.product == "Ticket") {
                                //已经买过月票，不能再获取奖章了
                                if (os.length >= 2) {
                                    var metal = 0;
                                }
                                else {
                                    var metal = 1;
                                }
                                customer.attrs.diamond += 2000;
                                customer.attrs.metal += metal;
                                customer.resetTicket(1);
                                if (firstCharge) {
                                    Toast.launch("购买了月票,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                                    Gift.notify();
                                }
                                else {
                                    Toast.launch("购买了月票");
                                }
                            }
                            else {
                                //已经买过月票，只能再获取2个奖章
                                if (os.length >= 1) {
                                    var metal = 2;
                                }
                                else {
                                    var metal = 3;
                                }
                                customer.attrs.diamond += 5000;
                                customer.attrs.metal += metal;
                                customer.resetTicket(2);
                                if (firstCharge) {
                                    Toast.launch("购买了VIP,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                                    Gift.notify();
                                }
                                else {
                                    Toast.launch("购买了VIP");
                                }
                            }
                        });
                    }
                }
                else {
                    // fetch again
                    times -= 1;
                    if (times > 0) {
                        Order.checkOrderPayed(customer, order, times, firstCharge);
                    }
                    else {
                        Toast.launch("支付超时，请稍后再试");
                    }
                }
            });
        }, 1000);
    };
    Order.charge = function (customer, gid, diamond) {
        Order.buy(customer, "Diamond", gid, diamond);
    };
    Order.buyTicket = function (customer) {
        Order.buy(customer, "Ticket", "ticket", 19);
    };
    Order.buyVIP = function (customer) {
        Order.buy(customer, "VIP", "vip", 49);
    };
    return Order;
}());
egret.registerClass(Order,'Order');
//# sourceMappingURL=Order.js.map