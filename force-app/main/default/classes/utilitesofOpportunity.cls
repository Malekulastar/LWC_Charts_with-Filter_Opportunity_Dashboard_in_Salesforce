public with sharing class utilitesofOpportunity {
    @AuraEnabled
    public static String getStages()
    {
        Schema.DescribeFieldResult fieldResult = Opportunity.StageName.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        List<Opportunitydto.stage> stageList= new List<Opportunitydto.stage>();
        for(Schema.PicklistEntry s:ple){
            Opportunitydto.stage obj= new Opportunitydto.stage();
            obj.stage=s.getLabel();
            stageList.add(obj);
            System.debug('value: '+s.getLabel());
        }
        return JSON.serialize(stageList); 
    }

    @AuraEnabled
    public static String getAcc(){
        String oppquery='SELECT Id,Name FROM Account  WHERE Id != NULL';
        List<Account> accopp=Database.query(oppquery);
        List<Opportunitydto.getAcc> oppList= new List<Opportunitydto.getAcc>();
        System.debug('IN table getAcc');
        for (Account ops:accopp) {
            Opportunitydto.getAcc obj =new Opportunitydto.getAcc();
            obj.Name=ops.Name;
           
            obj.Id=ops.Id;
           
            oppList.add(obj);
        }
        System.debug('Table Data get Acc'+oppList);
        return JSON.serialize(oppList); 
    }
    
    @AuraEnabled(cacheable=true)
    public static String getOrgCurrency() {
     String orgCurr = UserInfo.getDefaultCurrency();
        System.debug(orgCurr);
        return orgCurr; 
    }
}
