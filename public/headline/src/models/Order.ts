class Order {
    public static buy(customer:Customer, product: string, gid: string, price: number) {
        var firstCharge = customer.me.charge == 0;
        
        var order = { customer_id: customer.me.id, product: product, price: price, state: 0};
        application.dao.save("Order", order).then(function(o) {
            customer.saveNow();
            application.channel.pay({ goodsId: gid, goodsName: gid, goodsNumber: "1", money: price, orderId: o.id }).then(function(data){
            }, function(error){
                Toast.launch(error);
            });
                
            Order.checkOrderPayed(customer, o, 20, firstCharge);
        }, function(error){
            Toast.launch("保存订单失败，请稍后再试");
        });
    }
    
    public static checkOrderPayed(customer:Customer, order: any, times: number, firstCharge:boolean) {
		application.delay(function(){
			application.dao.fetch("Order", {id: order.id, state: 1}, {}).then(function(orders) {
				if (orders.length > 0) {
					var o = orders[0];
                    
					if (o.product == "Diamond") {
                        var diamond = 400;
                        if (o.price == 5) {
                            diamond = 1200;
                        } else if (o.price == 10) {
                            diamond = 2600;
                        } else if (o.price == 30) {
                            diamond = 9000;
                        } else if (o.price == 100) {
                            diamond = 36000;
                        } else if (o.price == 500) {
                            diamond = 200000;
                        }

						customer.me.diamond += diamond;
						customer.saveNow();             
                        
                        if (firstCharge) {
						    Toast.launch("购买了" + diamond.toString() + "钻石,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                            Gift.notify();
                        } else {
                            Toast.launch("购买了" + diamond.toString() + "钻石");
                        }
					} else {
						application.dao.fetch("Order", {customer_id: customer.me.id, "product": "Ticket", state: 1}, {}).then(function(os){
							if (o.product == "Ticket") {
								//已经买过月票，不能再获取奖章了
								if (succeed && os.length >= 2) {
									var metal = 0;
								} else {
									var metal = 1;
								}

                                customer.me.diamond += 2000;
								customer.me.metal += metal;
                                customer.resetTicket(1);
                                 
								if (firstCharge) {
									Toast.launch("购买了月票,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                                    Gift.notify();
								} else {
									Toast.launch("购买了月票");
								}
							} else {
								//已经买过月票，只能再获取2个奖章
								if (succeed && os.length >= 1) {
									var metal = 2;
								} else {
									var metal = 3;
								}

                                customer.me.diamond += 5000;
								customer.me.metal += metal;
                                customer.resetTicket(2);
                                
								if (firstCharge) {
									Toast.launch("购买了VIP,并获得了1500钻，1000k金币和1个奖章的首充礼物");
                            
                                    Gift.notify();
								} else {
									Toast.launch("购买了VIP");
								}
							}
						});
					}
				} else {
					// fetch again
					times -= 1;
					if (times > 0) {
						Order.checkOrderPayed(customer, order, times, firstCharge);
					} else {
						 Toast.launch("支付超时，请稍后再试");
					}
				}
			}); 
		}, 1000);
    }
    
    public static charge(gid:string, diamond: number): void {
        Order.buy("Diamond", gid, diamond); 
    }
    
    public static buyTicket(): void {
       	Order.buy("Ticket", "ticket", 19);
    }
    
    public static buyVIP(): void {
        Order.buy("VIP", "vip", 49);			
    }
}
