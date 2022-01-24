public with sharing class Opportunitydto {
       public class Opportunitydtobar {
    
    public String name;
    public Decimal y;
    }
   
    public class Opportunitydtofunnel{
       public String name;
       public Decimal y;
    }
    public class Opportunitydtotable{
        public String Name;
        public Id Id;
        public Id AccId;
       public Decimal Amount;
       public String StageName;
       public Decimal Probability;
       public String Account;
       public Date CloseDate;

    }
    public class stage{
     public String stage;
    }
    public class getAcc{
       public Id Id;
       public String Name;
    }
    public class filters{
       public String acctId;
       public String stageName;
       public String closeDate;
    }
}
