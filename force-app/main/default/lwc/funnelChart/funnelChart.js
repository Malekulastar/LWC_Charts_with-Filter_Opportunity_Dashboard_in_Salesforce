import { LightningElement,wire,track,api } from 'lwc';
import HighChart from '@salesforce/resourceUrl/HighChart';
import { loadScript } from 'lightning/platformResourceLoader';
import getOpportunity from '@salesforce/apex/GetAcc.getOpportunity';

export default class FunnelChart extends LightningElement {
    chartResourcesLoaded = false;
    // chartAccData=[];
    // chartAmtData=[];
     accts;
  

    connectedCallback() {
        Promise.all([
                loadScript(this, HighChart+'/highchart/highcharts.js')
            ])
            .then(() => {
                console.log('highchart Loaded');
                // console.log(this.acctId);
                this.chartResourcesLoaded = true; 
                        Promise.all([
                        loadScript(this, HighChart+'/highchart/modules/funnel.js')
                        ])
                        .then(() => {
                       // this.displayChart(); 
                        this.refreshFunnel();
                        })
                        .catch(error => {
                            console.log('FunnelChart : ' + error);
                        });
            })
           
            .catch(error => {
                console.log('HighChart : ' + error);
            });
    }
    @api
    refreshFunnel(filters){  
       //this.accts=acctId;
       

        getOpportunity({filters:JSON.stringify(filters) })
        .then(result =>{          
            const obj = JSON.parse(result);
                console.log('IN Funnel chart'+result);
                  
                            this.displayChart(obj);
                            console.log('In Funnel filet'+filters);
                            //this.displayChart(result);
    
        })
        .catch(error=>{
            
                console.log('Error ----'+JSON.stringify(error));
        });
    }

    displayChart(result){
    let container = this.template.querySelector('.fchart');
    //alert(container);  
    console.log('IN Graph'+result);  
    Highcharts.chart(container, {
        chart: {
            type: 'funnel'
        },
        title: {
            text: 'Sales funnel'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,

                    formatter: function() {
                        if (this.y > 1000000) {
                          return  this.point.name +' $'+Highcharts.numberFormat(this.y / 1000, 1) + "M";
                        } else if (this.y > 1000) {
                          return this.point.name +' $'+Highcharts.numberFormat(this.y / 1000, 1) + "K";
                        } else {
                          return this.point.name +' $'+this.y
                        }
                      },
                    
                    //numberformatter: '<b>{point.name}</b>({fa(point.y)})' ,
                    //format: '<b>{point.name}</b>({point.y:,.0f})' ,
                    softConnector: true
                },
                center: ['40%', '50%'],
                neckWidth: '30%',
                neckHeight: '25%',
                width: '80%'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Total Amount',
            data:result
            // [
            //     ['Website visits', 15654],
            //     ['Downloads', 4064],
            //     ['Requested price list', 1987],
            //     ['Invoice sent', 976],
            //     ['Finalized', 846]
            // ]
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            dataLabels: {
                                inside: true
                            },
                            center: ['50%', '50%'],
                            width: '100%'
                        }
                    }
                }
            }]
        }
    });
    
    }
    

}