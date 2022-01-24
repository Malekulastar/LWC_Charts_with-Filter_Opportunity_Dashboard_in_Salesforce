public with sharing class GetAcc {


    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Phone FROM Account  WITH SECURITY_ENFORCED];
    }
    @AuraEnabled
    public static List<Contact> getContacts(String accountId){
        return [Select Id,FirstName,LastName,Email,Phone from Contact where accountId=:accountId WITH SECURITY_ENFORCED];
         
    }
    @AuraEnabled
    public static String getOpportunity(String filters){
        Opportunitydto.filters cond ;
        String acctId;
        String stageName;

        if(filters != null && (!String.isBlank(filters)) ){
            cond = (Opportunitydto.filters)JSON.deserialize(filters,Opportunitydto.filters.class);
            acctId=cond.acctId;
            stageName=cond.stageName;

        }
                String query='';
             
        System.debug(cond);
        System.debug('IN query Funnel'+acctId+' StageName= '+stageName);
  

      // System.debug('Query'+oppquery);&& !String.isBlank(stageName) && !String.isBlank(acctId)
       String oppquery='Select StageName, sum(Amount) Total from Opportunity  where isClosed=false ';

       if(acctId != null && !String.isBlank(acctId)  ){
        System.debug('acctId'+acctId+'in first if');
        oppquery +=' AND AccountId = :acctId ' ;
    } 
        if(stageName != null && !String.isBlank(stageName) ){
            System.debug('stageName'+stageName+'in second if');
            oppquery +=' AND StageName = :stageName '; 
        } 
        oppquery+=' group by StageName' ; 

       System.debug('Query'+oppquery);

       List<AggregateResult> Aggregateopp=Database.query(oppquery);
       System.debug(Aggregateopp);
       Map<String,Decimal> oppData= new Map<String,Decimal>();
       List<Opportunitydto.Opportunitydtofunnel> oppList= new List<Opportunitydto.Opportunitydtofunnel>();

       for(AggregateResult ops:Aggregateopp){        
        oppData.put((String)ops.get('StageName'),(Decimal)ops.get('Total'));        
    }  

    for (String key : oppData.keySet()) {
        Opportunitydto.Opportunitydtofunnel obj =new Opportunitydto.Opportunitydtofunnel();
        obj.name=key;
        obj.y=oppData.get(key);
        oppList.add(obj);
    }
    System.debug('oppdata'+oppData);
       return JSON.serialize(oppList);
       // return [Select StageName, sum(Amount) Total from Opportunity group by StageName];
         
    }

    @AuraEnabled
    public static String getOpportunityList(String filters) {
       

        Opportunitydto.filters cond ;
        String acctId;
        String stageName;

        if(filters != null && (!String.isBlank(filters)) ){
            cond = (Opportunitydto.filters)JSON.deserialize(filters,Opportunitydto.filters.class);
            acctId=cond.acctId;
            stageName=cond.stageName;

        }
        System.debug(cond);
        System.debug('IN query Funnel'+acctId+' StageName= '+stageName);
        String oppquery='select Account.Name  name,sum(Amount) amount FROM Opportunity where  isClosed=false  ';

        System.debug('In Bar query'+acctId);
        if(acctId != null && !String.isBlank(acctId) ){
            System.debug('In if');
            oppquery +=' AND AccountId = :acctId ' ;
        }
        if(stageName != null && !String.isBlank(stageName)) {
            oppquery +=' AND StageName = :stageName '; 
            System.debug('In else');
        }

        oppquery +=' group by Account.Name LIMIT 10 '; 
        System.debug('Query Bar Chart' +oppquery);

    //String oppquery='select Account.Name  name,sum(Amount) amount FROM Opportunity  WHERE AccountId != NULL group by Account.Name LIMIT 10';
    List<AggregateResult> Aggregateopp=Database.query(oppquery);
    Map<String,Decimal> oppData= new Map<String,Decimal>();
    //List<Opportunitydto> oppList= new List<Opportunitydto>();
    List<Opportunitydto.Opportunitydtobar> oppList= new List<Opportunitydto.Opportunitydtobar>();
      for(AggregateResult ops:Aggregateopp){        
        oppData.put((String)ops.get('name'),(Decimal)ops.get('amount'));        
    }   
    for (String key : oppData.keySet()) {
        //oppList.add(new Opportunitydto(key,oppData.get(key)));
        Opportunitydto.Opportunitydtobar obj =new Opportunitydto.Opportunitydtobar();
        obj.name=key;
        obj.y=oppData.get(key);
        oppList.add(obj);
    }
    System.debug('oppList'+oppList);
    return JSON.serialize(oppList);
    }


    @AuraEnabled
    public static String getOpportunityTable( String filters) {
        String result=oppServices.tabledata(filters);
        return result;
        
        // String oppquery='SELECT Id,Account.Id,Name, StageName,Probability,Account.Name ,CloseDate,Amount FROM Opportunity  WHERE AccountId != NULL LIMIT 10';
        // List<Opportunity> tableopp=Database.query(oppquery);
        // List<Opportunitydto.Opportunitydtotable> oppList= new List<Opportunitydto.Opportunitydtotable>();
        // System.debug('IN table');
        // for (Opportunity ops:tableopp) {
        //     Opportunitydto.Opportunitydtotable obj =new Opportunitydto.Opportunitydtotable();
        //     obj.Name=ops.Name;
        //     obj.Amount=ops.Amount;
        //     obj.StageName=ops.StageName;
        //     obj.Probability=ops.Probability;
        //     obj.Account=ops.Account.Name;
        //     obj.CloseDate=ops.CloseDate;
        //     obj.Id=ops.Id;
        //     obj.AccId=ops.Account.Id;
        //     oppList.add(obj);
        // }
        // System.debug('Table Data'+oppList);
        // return JSON.serialize(oppList);
        //return [SELECT Id,Name, StageName,Probability,Account.Name ,CloseDate,Amount FROM Opportunity  WHERE AccountId != NULL LIMIT 10];
    }


   
}

   // @AuraEnabled(cacheable=true)
    // public static Integer delAccountList(Id) {
    //     Account[] doomedAccts = [SELECT Id, Name FROM Account WHERE Id  !=:'Id'];

    //     if(doomedAccts){
    //         delete doomedAccts;
    //         return 1;
    //     } else{
        
    //         return 0;
    //     }                
    
    // }

    

