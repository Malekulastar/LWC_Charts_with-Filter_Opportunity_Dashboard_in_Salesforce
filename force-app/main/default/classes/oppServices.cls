public with sharing class oppServices {
  
    public static String tabledata(String filters) {
        Integer orgFiscalMonth = [SELECT FiscalYearStartMonth FROM Organization].FiscalYearStartMonth;
        String currentFiscalYear = [SELECT FiscalYearSettings.Name FROM Period WHERE Type = 'Year' AND StartDate <= TODAY AND EndDate >= TODAY].FiscalYearSettings.Name;
       
        
        Opportunitydto.filters cond ;
        String acctId;
        String stageName;
        String closeDate;

        Date startDatefy;
        Date endDatefy;

        if(filters != null && (!String.isBlank(filters)) ){
            cond = (Opportunitydto.filters)JSON.deserialize(filters,Opportunitydto.filters.class);
            acctId=cond.acctId;
            stageName=cond.stageName;
            closeDate=cond.closeDate;

        }



                
        System.debug(cond);
        System.debug('IN query dataTable'+acctId+' StageName= '+stageName);


        System.debug('IN query datatable'+acctId);
        String oppquery='SELECT Id,Account.Id,Name, StageName,Probability,Account.Name ,CloseDate,Amount FROM Opportunity WHERE isClosed=false';
             
        if(acctId != null && !String.isBlank(acctId)  ){
            System.debug('acctId'+acctId+'in first if');
            oppquery +=' AND AccountId = :acctId ' ;
        } 
            if(stageName != null && !String.isBlank(stageName) ){
                System.debug('stageName'+stageName+'in second if');
                oppquery +=' AND StageName = :stageName '; 
            }

    if( closeDate != null && !String.isBlank( closeDate) ){
        if(closeDate == 'cyear'){
            startDatefy=date.parse( orgFiscalMonth +'/'+'01'+'/'+currentFiscalYear);
           // endDatefy=date.parse('12'+'/'+'31'+'/'+currentFiscalYear);
            endDatefy=startDatefy.addYears(1);
            System.debug('Start Date'+startDatefy);
            System.debug('End Date'+endDatefy);
            oppquery+= ' AND CloseDate >= :startDatefy AND CloseDate <= :endDatefy ';

        }


    }
        oppquery+='  LIMIT 10';
        System.debug(oppquery);

        //String oppquery='SELECT Id,Account.Id,Name, StageName,Probability,Account.Name ,CloseDate,Amount FROM Opportunity  WHERE AccountId != NULL LIMIT 10';
        List<Opportunity> tableopp=Database.query(oppquery);
        List<Opportunitydto.Opportunitydtotable> oppList= new List<Opportunitydto.Opportunitydtotable>();
        System.debug('IN table');
        for (Opportunity ops:tableopp) {
            Opportunitydto.Opportunitydtotable obj =new Opportunitydto.Opportunitydtotable();
            obj.Name=ops.Name;
            obj.Amount=ops.Amount;
            obj.StageName=ops.StageName;
            obj.Probability=ops.Probability;
            obj.Account=ops.Account.Name;
            obj.CloseDate=ops.CloseDate;
            obj.Id=ops.Id;
            obj.AccId=ops.Account.Id;
            oppList.add(obj);
        }
        System.debug('Table Data'+oppList);
        return JSON.serialize(oppList);
    }
}
