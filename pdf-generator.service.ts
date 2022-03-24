import { Injectable } from '@angular/core';
import * as pdfMake from "../../node_modules/pdfmake/build/pdfmake";
import * as pdfFonts from "../../node_modules/pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  estimateDetails;
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

  constructor() {
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
      variantList: [{
        name: 'Variant_1',
        underlay: {
          firstConnectivity: {
            access: {
              value: 'Pro (up 40/down 100)',
              oneTimeFee: '450',
              monthlyFee: '59.97'
            },
            cpe: {
              value: '',
              oneTimeFee: '',
              monthlyFee: ''
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          },
          secondConnectivity: {
            access: {
              value: 'Pro (up 40/down 100)',
              oneTimeFee: '450',
              monthlyFee: '59.97'
            },
            cpe: {
              value: '',
              oneTimeFee: '',
              monthlyFee: ''
            },
            sla: {
              value: '10*5',
              oneTimeFee: '0.00',
              monthlyFee: '0.00'
            }
          }
        }
      }, {}]
    }
  }

  getPdfDocumentDefinition() {
    return {
      content: this.getPdfBody(this.estimateDetails),
      info: {
        title: 'Quote.pdf',
        name: 'Quote'
      },
      styles: this.pdfStyles
    }
  }

  getPdfBody(estimateDetails) {
    return [this.getGeneralInformation(estimateDetails),this.getEstimateSummary(estimateDetails), this.getEstimateDetails(estimateDetails)];
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
    estimateDetails.variantList.forEach(element => {
      summary.table.body[1][0]['table'].body = summary.table.body[1][0]['table'].body.concat(this.getVariantsSummary(element));
    });

    summary.table.body[1][0]['table'].body.push([{text: 'Total Contract', style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
     {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
     {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
     {text: '1350',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
     {text: '1209ss',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}]);

    return summary;
  }

  getVariantsSummary(variant) {
    return [
      [{text: 'Variant 1',rowSpan: 4, style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
       {text: '# Sites',  style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '1',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 3},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: 'Underlay',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '$1150',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: '$487',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: 'Overlay',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '$1150',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: '$487',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}],
      [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: 'Total Variant 1 with 1 site(s)',  style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
       {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
       {text: '$1150',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true},
       {text: '$487',  style: 'cellStyle', borderColor: this.cellBorderColor,  bold:true}]
    ]
  }

  getEstimateDetails(estimateDetails){
    let estDetails = {
      style: 'tableContent',
      table: {
        widths: ['*'],
        body: [
          [{text: '3. ESTIMATE DETAILS', style: 'panelHeader'}],
          [{
            table: {
              widths: [5,80,'*','*',30,'*',40,40],
              body: [
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
                {text: 'Hub & Spoke', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 6},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 12},
                {text: 'Variant_1', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true, rowSpan: 12},
                {text: '# Sites', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '1', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 4},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: 'Underlay', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 6},
                {text: 'First Connectivity', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 3},
                {text: 'Access', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Pro (up 40/down 100)', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '450',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '59.97',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'CPE', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'NA', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '10*5', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '0.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '0.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Second Connectivity', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 3},
                {text: 'Access', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Fibermax (up 40/down 100)', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '450',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '397.97',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'CPE', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Cisco 4221', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '250',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '15.67',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '15*6', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '0.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '15.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: 'Overlay', style: 'cellStyle', borderColor: this.cellBorderColor, rowSpan: 4},
                {text: 'First SDWAN box', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'MX67', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '450',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '59.97',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Mobile SDWAN box', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'NA', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'SLA', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Same day', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '0.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '15.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Security', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Advanced', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '100.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '47.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

                [{text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, bold: true},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor, colSpan: 2},
                {text: '', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: 'Total Variant 1', style: 'cellStyle', borderColor: this.cellBorderColor},
                {text: '1250.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true},
                {text: '572.00',style: 'cellStyle', borderColor: this.cellBorderColor, bold:true}],

              ]
            }
          }
          ]
        ]
      },
      layout: 'noBorders'
    };
    return estDetails;
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
}
