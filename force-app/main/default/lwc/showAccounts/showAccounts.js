import { LightningElement,api,wire,track } from 'lwc';
import getAccountList from '@salesforce/apex/GetAcc.getAccountList';
//import {delAccountList} from '@salesforce/apex/GetAcc.delAccountList';
//import {deleteRecord} from 'lightning/uiRecordApi';

export default class ShowAccounts extends LightningElement {
@track accountl;
    @wire(getAccountList) accountss;
    @track recordId;

    @wire (getAccountList) accounts({data,error}){
        if (data) {
           // this.accountl=data;
        console.log(data); 
        } else if (error) {
        console.log(error);
        }
   }


   Delete(event){
    this.recordId = event.target.value;
    window.console.log('recordId# ' + this.recordId);
    // if(delAccountList(this.recordId.Id)){
    //     console.log('Record Deleted');
    // }else{
    //     console.log('Record Not Deleted');
    // }

    }

   
}