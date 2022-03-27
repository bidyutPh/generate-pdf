import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from "../../node_modules/pdfmake/build/pdfmake";
import * as pdfFonts from "../../node_modules/pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  estimateDetails;
  imagebase64: String;
  cellBorderColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
  pdfStyles = {
    panelHeader: {
      bold: true,
      fontSize: 8,
      fillColor: '#500380',
      color: 'white',
      margin: [20,0,0,0]
    },
    tableStyle: {

    },
    tableContent: {
      fontSize: 7,
      //fillColor: '#f0e4f7',
      margin: [0,0,0,10]
    },
    cellStyle: {
      //fontsize: 3,
      fillColor: '#f0e4f7',
    }
  }

  constructor(
    private http: HttpClient
  ) {
    this.estimateDetails = {
      customer: {
        name: 'Bidyut Phukan',
        number: '100876'
      },
      estimate: {
        name: 'Estimate_1',
        est_number: '19834',
        contract_period: '2',
        date: '3/3/2022',
        preparedBy: 'Ramesh Garh',
        design: 'Hub & Spoke'
      },
      variantSummary: [
        {
          name: 'Variant_1',
          numOfSites: '1',
          underlayFee: {
            oneTime: '1150',
            monthly: '1750'
          },
          overlay: {
            oneTime: '1250',
            monthly: '1050'
          }
        },
        {
          name: 'Variant_2',
          numOfSites: '5',
          underlayFee: {
            oneTime: '950',
            monthly: '550'
          },
          overlay: {
            oneTime: '750',
            monthly: '500'
          }
        }
      ],
      variantList: [{
        name: 'Variant_1',
        numOfSites: '1',
        underlay: {
          firstConnectivity: {
            access: {
              value: 'Pro (up 40/down 100)',
              oneTimeFee: '450',
              monthlyFee: '59.97'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          },
          secondConnectivity: {
            access: {
              value: 'Fibermax (up 40/down 100)',
              oneTimeFee: '650',
              monthlyFee: '95.98'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          }
        },
        overlay: {
          firstSdwanBox: {
            value: 'MX67',
            oneTimeFee: '450',
            monthlyFee: '59.97'
          },
          mobileSdwanBox: {
            value: 'NA',
            oneTimeFee: '0.00',
            monthlyFee: '0.00'
          },
          sla: {
            value: 'Same day',
            oneTimeFee: '0.00',
            monthlyFee: '15.97',
          },
          security: {
            value: 'Advanced',
            oneTimeFee: '100',
            monthlyFee: '47',
          }
        }
      },
      {
        name: 'Variant_1',
        numOfSites: '1',
        underlay: {
          firstConnectivity: {
            access: {
              value: 'Pro (up 40/down 100)',
              oneTimeFee: '450',
              monthlyFee: '59.97'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          },
          secondConnectivity: {
            access: {
              value: 'Fibermax (up 40/down 100)',
              oneTimeFee: '650',
              monthlyFee: '95.98'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          }
        },
        overlay: {
          firstSdwanBox: {
            value: 'MX67',
            oneTimeFee: '450',
            monthlyFee: '59.97'
          },
          mobileSdwanBox: {
            value: 'NA',
            oneTimeFee: '0.00',
            monthlyFee: '0.00'
          },
          sla: {
            value: 'Same day',
            oneTimeFee: '0.00',
            monthlyFee: '15.97',
          },
          security: {
            value: 'Advanced',
            oneTimeFee: '100',
            monthlyFee: '47',
          }
        }
      },
      {
        name: 'Variant_1',
        numOfSites: '1',
        underlay: {
          firstConnectivity: {
            access: {
              value: 'Pro (up 40/down 100)',
              oneTimeFee: '450',
              monthlyFee: '59.97'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          },
          secondConnectivity: {
            access: {
              value: 'Fibermax (up 40/down 100)',
              oneTimeFee: '650',
              monthlyFee: '95.98'
            },
            cpe: {
              value: '',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          }
        },
        overlay: {
          firstSdwanBox: {
            value: 'MX67',
            oneTimeFee: '450',
            monthlyFee: '59.97'
          },
          mobileSdwanBox: {
            value: 'NA',
            oneTimeFee: '0.00',
            monthlyFee: '0.00'
          },
          sla: {
            value: 'Same day',
            oneTimeFee: '0.00',
            monthlyFee: '15.97',
          },
          security: {
            value: 'Advanced',
            oneTimeFee: '100',
            monthlyFee: '47',
          }
        }
      }]
    }

    this.getLogo('/assets/proximus.png');
  }

  getPdfDocumentDefinition() {
    return {
      header: this.getHeader(),
      footer: function (currentPage, pageCount) {
        return { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', fontSize:5, margin: [0, 20, 50, 0] }
      },
      content: this.getPdfBody(this.estimateDetails),
      info: {
        title: 'Quote.pdf',
        name: 'Quote'
      },
      styles: this.pdfStyles
    }
  }

  getPdfBody(estimateDetails) {
    let pdfContentArray = [this.getGeneralInformation(estimateDetails),this.getEstimateSummary(estimateDetails)];
    pdfContentArray = pdfContentArray.concat( this.getEstimateDetails(estimateDetails));
    return pdfContentArray;
  }

  getGeneralInformation(estimateDetails) {
    return {
      table: {
        widths: ['*'],

        body : [
          [{text: '1. GENERAL INFORMATION', style: 'panelHeader'}],
          [
            {
              style: 'tableContent',
              table: {
                widths: [100,100,'*'],
                body: [
                  [{text:'Customer', rowSpan: 2, style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                   {text:'Name', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text:'Bidyut Phukan', style: 'cellStyle', borderColor: this.cellBorderColor}],
                  ['', {text:'Number', style: 'cellStyle', borderColor: this.cellBorderColor},
                    {text:'13244', style: 'cellStyle', borderColor: this.cellBorderColor}],
                  [{text:'Estimate', rowSpan: 5, style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                   {text: 'Name', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text: estimateDetails.estimate.name, style: 'cellStyle', borderColor: this.cellBorderColor}],
                  ['', {text: 'Number', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text: estimateDetails.estimate.est_number, style: 'cellStyle', borderColor: this.cellBorderColor}],
                  ['', {text: 'Contract period', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text: estimateDetails.estimate.contract_period, style: 'cellStyle', borderColor: this.cellBorderColor}],
                  ['', {text: 'Date', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text: estimateDetails.estimate.date, style: 'cellStyle', borderColor: this.cellBorderColor}],
                  ['', {text: 'Pepared By', style: 'cellStyle', borderColor: this.cellBorderColor},
                   {text: estimateDetails.estimate.preparedBy, style: 'cellStyle', borderColor: this.cellBorderColor}],
                ]
              },
              // layout: {
              //   defaultBorder: false,
              // },
            }
          ]
        ]
      },
      layout: 'noBorders'
    }
  }

  getEstimateSummary(estimateDetails) {
    let summary = {
      style: 'tableContent',
      table: {
        widths: ['*'],
        body: [
          [{text: '2. ESTIMATE SUMMARY', style: 'panelHeader'}],
          [{
            table: {
              widths: [100,'*','*',50,50],
              body: [
                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                 {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                 {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                 {text: 'One time fee',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                 {text: 'Monthly',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],
              ]
            }
          }
          ]
        ]
      },
      layout: 'noBorders'
    };
    estimateDetails.variantSummary.forEach(element => {
      summary.table.body[1][0]['table'].body = summary.table.body[1][0]['table'].body.concat(this.getVariantsSummary(element));
    });

    summary.table.body[1][0]['table'].body.push([{text: 'Total Contract', style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
     {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
     {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
     {text: `\u20AC  ${this.getContractOneTimeTotal(estimateDetails.variantSummary)}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
     {text: `\u20AC  ${this.getContractMonthlyTotal(estimateDetails.variantSummary)}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}]);

    return summary;
  }

  getVariantsSummary(variant) {
    return [
      [{text: `${variant.name}`,rowSpan: 4, style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
       {text: '# Sites',  style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: `${variant.numOfSites}`,  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 3},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: 'Underlay',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: `\u20AC ${variant.underlayFee.oneTime}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: `\u20AC ${variant.underlayFee.monthly}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: 'Overlay',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: `\u20AC ${variant.overlay.oneTime}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: `\u20AC ${variant.overlay.monthly}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: `Total ${variant.name} with ${variant.numOfSites} site(s)`,  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: `\u20AC ${this.getVariantSummaryOneTimeTotal(variant)}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: `\u20AC ${this.getVariantSummaryMonthlyTotal(variant)}`,  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}]
    ]
  }

  getEstimateDetails(estimateDetails){
    let variantTables = [];

    estimateDetails.variantList.forEach((variant, index) => {
      let header = [[{text: `${3 + index}. ESTIMATE DETAILS`, style: 'panelHeader', borderColor: this.cellBorderColor, colSpan:8},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor},
         {text:'', borderColor: this.cellBorderColor}]];
      let estDetails = {
        style: 'tableContent',
        table: {
          dontBreakRows: true,
          widths: ['*'],
          body: [
            //[{text: `${3 + index}. ESTIMATE DETAILS`, style: 'panelHeader'}],
            [{
              table: {
                widths: [5,80,'*','*',30,'*',40,40],
                body: []
              }
            }
            ]
          ]
        },
        layout: 'noBorders'
      };
      if (index === 0) {
        estDetails.table.body[0][0]['table']['body'] = [].concat(header, this.getEstimateDetailsFixedHeader(estimateDetails), this.getVariantDetails(variant));
      } else {
        estDetails.table.body[0][0]['table']['body'] = [].concat(header, this.getVariantDetails(variant));
      }

      // if (index != (estimateDetails.variantList.length-1)) {
      //   estDetails.table.body[1][0]['table']['body'].push([{text:''},{text:''},{text:''},{text:''},{text:''},{text:''},{text:''},{text:'', pageBreak: 'after'}]);
      // }

      variantTables.push(estDetails);
    })
    return variantTables;
  }

  getInfoRow() {
    return [
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {ul: [
				'Offer for informational use and not binding',
				'Connectivity prices are only indicative',
				'All prices are in Euro',
        'VAT not inlcuded',
        'Rental & Maintenance are monthly fees',
        'Validity estimate is 30 days',
        'Prices for internal cabling not included',
        'Prices for cabling private domain not included'
			 ], style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 7},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '',style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '',style: 'cellStyle', borderColor: this.cellBorderColor}
    ]
  }

  getHeader() {
    return {
      columns: [
        {
          width: 80,
          image: this.imagebase64,
          margin: [40,10,0,0]
        },
        {
    			stack: [
            {
              text: 'ESTIMATE',
              alignment: 'right',
              margin: [0,10,40,0],
              fontSize: 8
            },
            {
              text: 'Explore-SDWAN',
              alignment: 'right',
              margin: [0,0,40,0],
              fontSize: 6
            },
    			],
    			width: '*'
    		}
      ]
    }
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagebase64 = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  getLogo(path) {
    this.http.get(path, { responseType: 'blob' })
      .subscribe(res => {
        this.getBase64(res);
      });
  }

  getVariantSummaryOneTimeTotal(variant) {
    return parseInt(variant.underlayFee.oneTime) + parseInt(variant.overlay.oneTime);
  }

  getVariantSummaryMonthlyTotal(variant) {
    return parseInt(variant.underlayFee.monthly) + parseInt(variant.overlay.monthly);
  }

  getContractOneTimeTotal(variants) {
    return variants.reduce((a, b) => {
      return parseInt(a.underlayFee.oneTime) + parseInt(a.overlay.oneTime) + parseInt(b.underlayFee.oneTime) + parseInt(b.overlay.oneTime);
    });
  }

  getContractMonthlyTotal(variants) {
    return variants.reduce((a, b) => {
      return parseInt(a.underlayFee.monthly) + parseInt(a.overlay.monthly) + parseInt(b.underlayFee.monthly) + parseInt(b.overlay.monthly);
    });
  }

  getEstimateDetailsFixedHeader(estimateDetails) {
    return [
      [{text: 'General', style: 'cellStyle', borderColor: this.cellBorderColor,  colSpan: 6, bold:true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor}],
      this.getInfoRow(),

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor,  colSpan: 6,},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'One time fee',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: 'Monthly',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: 'Design', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${estimateDetails.estimate.design}`, style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 6},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],
    ];
  }

  getVariantDetails(variant) {
    return [
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 12},
      {text: `${variant.name}`, style: 'cellStyle', borderColor: this.cellBorderColor, bold: true, rowSpan: 12},
      {text: '# Sites', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.numOfSites}`, style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 4},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: 'Underlay', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 6},
      {text: 'First Connectivity', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 3},
      {text: 'Access', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.firstConnectivity.access.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.firstConnectivity.access.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.firstConnectivity.access.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'CPE', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.firstConnectivity.cpe.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.firstConnectivity.cpe.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.firstConnectivity.cpe.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.firstConnectivity.sla.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.firstConnectivity.sla.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.firstConnectivity.sla.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'Second Connectivity', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 3},
      {text: 'Access', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.secondConnectivity.access.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.secondConnectivity.access.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.secondConnectivity.access.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'CPE', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.secondConnectivity.cpe.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.secondConnectivity.cpe.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.secondConnectivity.cpe.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.underlay.secondConnectivity.sla.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.underlay.secondConnectivity.sla.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.underlay.secondConnectivity.sla.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: 'Overlay', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 4},
      {text: 'First SDWAN box', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.overlay.firstSdwanBox.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.overlay.firstSdwanBox.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.overlay.firstSdwanBox.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'Mobile SDWAN box', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.overlay.mobileSdwanBox.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.overlay.mobileSdwanBox.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.overlay.mobileSdwanBox.monthlyFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.overlay.sla.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.overlay.sla.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.overlay.sla.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: 'Security', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `${variant.overlay.security.value}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${variant.overlay.security.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${variant.overlay.security.oneTimeFee}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
      {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `Total ${variant.name}`, style: 'cellStyle', borderColor: this.cellBorderColor},
      {text: `\u20AC ${this.getVariantOneTimeTotalSum(variant)}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
      {text: `\u20AC ${this.getVariantMonthlyTotalSum(variant)}`,style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],
    ]
  }

  getVariantOneTimeTotalSum(variant) {
    return parseInt(variant.underlay.firstConnectivity.access.oneTimeFee) +
    parseInt(variant.underlay.firstConnectivity.cpe.oneTimeFee) +
    parseInt(variant.underlay.firstConnectivity.sla.oneTimeFee) +
    parseInt(variant.underlay.secondConnectivity.access.oneTimeFee) +
    parseInt(variant.underlay.secondConnectivity.cpe.oneTimeFee) +
    parseInt(variant.underlay.secondConnectivity.sla.oneTimeFee) +
    parseInt(variant.overlay.firstSdwanBox.oneTimeFee) +
    parseInt(variant.overlay.mobileSdwanBox.oneTimeFee) +
    parseInt(variant.overlay.sla.oneTimeFee) +
    parseInt(variant.overlay.security.oneTimeFee);
  }

  getVariantMonthlyTotalSum(variant) {
    return parseInt(variant.underlay.firstConnectivity.access.monthlyFee) +
    parseInt(variant.underlay.firstConnectivity.cpe.monthlyFee) +
    parseInt(variant.underlay.firstConnectivity.sla.monthlyFee) +
    parseInt(variant.underlay.secondConnectivity.access.monthlyFee) +
    parseInt(variant.underlay.secondConnectivity.cpe.monthlyFee) +
    parseInt(variant.underlay.secondConnectivity.sla.monthlyFee) +
    parseInt(variant.overlay.firstSdwanBox.monthlyFee) +
    parseInt(variant.overlay.mobileSdwanBox.monthlyFee) +
    parseInt(variant.overlay.sla.monthlyFee) +
    parseInt(variant.overlay.security.monthlyFee);
  }
}
