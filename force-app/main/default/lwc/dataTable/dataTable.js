import { LightningElement,wire,api,track } from 'lwc';
import getOpportunityTable from '@salesforce/apex/GetAcc.getOpportunityTable';
import getOrgCurrency from '@salesforce/apex/utilitesofOpportunity.getOrgCurrency';

export default class DataTable extends LightningElement {
     obj=[];
    chartAmtData=[];
    curr;
    @track urlOpp='https://creative-bear-ua11wb-dev-ed.lightning.force.com/';

    @api accts;
    @api stagename;
    @api closedate;
    
    connectedCallback(){
         this.refreshTable();

     }

    //@wire(getOrgCurrency) getOrgCurr;
    @api
    refreshTable(filters){
   console.log('hii');
 
        getOpportunityTable({filters:JSON.stringify(filters) })
        .then(result => {
            console.log('In Then');
            //console.log('in data table'+acctId);
          this.obj=JSON.parse(result);
          console.log('hii'+this.obj);
                        //this.objects = result;
                    //alert(' Result ==> ' + this.objects);
                    for(const i in  this.obj){
                        this.obj[i].Amount=this.format(this.obj[i].Amount,this.curr);     
                       
                    } //console.log(this.chartAmtData);

        })
        .catch(error => {
            console.log('Error Occured:- '+error);
        });

          
  

   getOrgCurrency()
   .then(result =>{  
       this.curr=result;           
           console.log(result);
           console.log('curr'+this.curr);
   })
   .catch(error=>{
       
           console.log('Error ----'+error);
   });
  
    }

    
    format(value,curr) {
        if (this.value >= 1E6) {
          return this.curr+' ' + (value / 1000000).toFixed(2) + ' M';
        }
        return this.curr+' ' +(value / 1000).toFixed(2) + ' k';
      }

   
    openOpp(event) {
       
        let OppId=event.target.dataset.id;
        //this.urlOpp+=OppId;
        console.log(this.urlOpp);
        //alert('Opportunity id => ' +this.urlOpp+OppId);
        window.open(this.urlOpp+OppId);  
        // console.log('Opportunity id => ' + url+OppId);
        
    }

  
}