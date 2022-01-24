import { LightningElement ,wire,track} from 'lwc';

import getAccountList from '@salesforce/apex/GetAcc.getAccountList';
import getContacts from '@salesforce/apex/GetAcc.getContacts';

const columns = [{
  label: 'First Name',
  fieldName: 'FirstName'
},
{
  label: 'Last Name',
  fieldName: 'LastName'
},
{
  label: 'Email',
  fieldName: 'Email',
  type: 'email'
},
{
  label: 'Phone',
  fieldName: 'phone',
  type: 'phone'
}

];



export default class HiiThere extends LightningElement {
  
  items = [
    {
        type: 'avatar',
        href: 'https://www.salesforce.com',
        label: 'Avatar Pill 1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        variant: 'circle',
        alternativeText: 'User avatar',
        isLink: true,
    },
    {
        type: 'avatar',
        href: '',
        label: 'Avatar Pill 2',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        variant: 'circle',
        alternativeText: 'User avatar',
    },
    {
        type: 'avatar',
        href: 'https://www.google.com',
        label: 'Avatar Pill 3',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        fallbackIconName: 'standard:user',
        variant: 'circle',
        alternativeText: 'User avatar',
        isLink: true,
    },
  ];
  

  @track accountId = '';
  @track contacts;
  @track columns = columns;
  @wire(getAccountList) accounts;


  onValueSelection(event) {
    // eslint-disable-next-line no-alert
    const selectedAccount = event.target.value;
    this.accountId = event.target.value;
    if (selectedAccount != null) {
        getContacts({
                accountId: selectedAccount
            })
            .then(result => {
                this.contacts = result;
                // eslint-disable-next-line no-console
                console.log('result' + JSON.stringify(result) + selectedAccount);
            })
            .catch(error => {
                this.error = error;
            });
    }
}



    greeting = 'World';
    changeHandler(event) {
        greeting=greeting.concat(this.greeting);
      this.greeting = event.target.value;
    }
    activeSectionMessage = '';

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
}