import { LightningElement,api,wire,track } from 'lwc';
import HighChart from '@salesforce/resourceUrl/HighChart';
import  getOpportunityList from '@salesforce/apex/GetAcc.getOpportunityList';
import { loadScript } from 'lightning/platformResourceLoader';

export default class BarChart extends LightningElement {
    chartResourcesLoaded = false;
    chartAmtData = [];
    chartAccData = [];
    // @api accts;
    // @api stagename;
    
    

    connectedCallback() {
        Promise.all([
                loadScript(this, HighChart+'/highchart/highcharts.js')
            ])
            .then(() => {
                console.log('Barchart Loaded');
                this.refreshBar();
                
            }) 
            .catch(error => {
                console.log('HighChart : ' + error);
            });
    } 
    @api
    refreshBar(filters){  
       //this.accts=acctId;
       this.chartAmtData=[];
       this.chartAccData=[];
       getOpportunityList ({filters:JSON.stringify(filters)} )
        .then(result =>{          
            const obj = JSON.parse(result);
                console.log('Bar result'+result);
                console.log('In Bar filter'+filters);
                obj.forEach(opp => {
                            console.log('Name ');
                             this.chartAmtData.push(opp.y);
                            this.chartAccData.push(opp.name);
                            
                        })
                        console.log(''+this.chartAmtData);
                        console.log(this.chartAccData);
                        this.Displaychart(this.chartAmtData,this.chartAccData);

    })
    .catch(error=>{
        
            console.log('Error ----'+error);
    });
}

    Displaychart(chartAmtData,chartAccData){
      console.log('In Graph'+chartAmtData+chartAccData); 
      
    let container=this.template.querySelector('.bchart');
    Highcharts.chart(container, {
        chart: {
            type: 'column'
        },
        title: {
            text:' Account Wise Revenue'
        },
        subtitle: {
            text: 'Source: Salesforce Org'
        },
        xAxis: {
            categories: 
               chartAccData
            ,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount ($)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} USD</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Account Names',
            data: chartAmtData
    
        }]
    });
}


}