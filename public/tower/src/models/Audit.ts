class Audit {
    public static claim(audit: any): Q.Promise<any>{
        audit.claimed = 1;
        return application.dao.save("Audit", audit);
    }

    public static hasRewards(audits:any[]): boolean{
         for(var i = 0; i < audits.length; i++) {
            if (audits[i].rewards > 0 && audits[i].claimed == 0){
                return true;
            }
         }
         
         return false;
    }
    
    public static check(customer): Q.Promise<any[]> {
        return Q.Promise<any[]>(function(resolve, reject, notify) {
            application.dao.fetch("Audit", {customer_id: customer.attrs.id, category:"users", operator:"login", rewards: {$ne: 0}}, {order : 'create_time DESC', limit:7}).then(function(audits){
                var validAudits = [];
                
                if (audits.length > 0) {
                    validAudits.push(audits[0]);
                    for(var i = 1; i < audits.length; i++) {
                        if (audits[i].rewards < audits[i - 1].rewards) {
                            validAudits.push(audits[i]);
                        } else {
                            break;
                        }
                    }
                }
                
                resolve(validAudits);
            }, function(error){
                reject(error);
            });
        });
    }
}
