import { LightningElement,api } from 'lwc';
import getStages from '@salesforce/apex/utilitesofOpportunity.getStages';
import getAcc from '@salesforce/apex/utilitesofOpportunity.getAcc';
import CloseDate from '@salesforce/schema/Opportunity.CloseDate';
export default class OpportunityDashboard extends LightningElement {
   stages=[];
   accts=[];
   acctId;
   stageName;
   closeDate;

   filters={
       acctId:'',
       stageName:'',
      closeDate:''
   };


    connectedCallback(){
        this.showFilters();
    }


    showFilters(){
    getStages()
    .then(result =>{  
        this.stages=JSON.parse(result);;           
            console.log(result);
            console.log('Stages'+this.stages);
           this.stages.forEach(opp => {
            console.log(opp.stage);
            
        })
    })
    .catch(error=>{
        
            console.log('Error ----'+error);
    });

    getAcc()
    .then(result =>{  
        this.accts=JSON.parse(result);;           
           // console.log(result);
           // console.log('Stages'+this.stages);
           this.stages.forEach(opp => {
           // console.log(opp.stage);
            
        })
    })
    .catch(error=>{
        
            console.log('Error ----'+error);
    });
}

    onTest(event){
         this.acctId=this.template.querySelector(".select-01").value ;
         this.stageName=this.template.querySelector(".select-02").value ;
         this.closeDate=this.template.querySelector(".select-03").value;
       // console.log('Account Id '+ this.acctId+'Stage Name'+this.stageName);
         alert('Apply Filters Pressed  Account Id  '+this.acctId+'  Stage Name '+this.stageName+' Closedate '+this.closeDate);
         this.filters.acctId=this.acctId;
         this.filters.stageName=this.stageName;
         this.filters.closeDate=this.closeDate;
         
        this.template.querySelector('c-funnel-Chart').refreshFunnel(this.filters);
       
        this.template.querySelector('c-bar-Chart').refreshBar(this.filters);
        
         this.template.querySelector('c-data-Table ').refreshTable(this.filters);

          //  this.template.querySelector('c-funnel-Chart').refreshFunnel(this.acctId);
        //this.template.querySelector('c-bar-Chart').refreshBar(this.acctId);
         //this.template.querySelector('c-data-Table ').refreshTable(this.acctId);

    }
  
}