import { Component } from '@angular/core';
import { Resume, Experience, Education, Skill } from './resume';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor(private scriptService: ScriptService) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        // {
        //   text: 'RESUME',
        //   bold: true,
        //   fontSize: 20,
        //   alignment: 'center',
        //   margin: [0, 0, 0, 20]
        // },
        // this.getHeader(),
        // this.getEstimateDetails(),
        ...this.getVariantDetails(this.pdfDetails),
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          estimateDetails: {
            fontSize: 8,
            bold: true
          },
          variantHeader: {
            fontSize: 10,
            bold: true
          },
          variantBody: {
            fontSize: 8,
          },
          footer: {
            fontSize: 8,
            margin: [0, 20, 0, 0],
          },

          name: {
            fontSize: 16,
            bold: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  getExperienceObject(experiences: Experience[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Result',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }

  getHeader(estimateDetails) {
    return {
      table: {
        widths: [100, '*',],
        body: [
          [{
            text: estimateDetails.customerName,
            style: 'tableHeader',
            alignment: 'center'
          },
          {
            text: 'SD-WAN Meraki : Estimate',
            style: 'tableHeader',
            alignment: 'center'
          }
          ]
        ]
      }
    };
  }

  getEstimateDetails(estimateDetails) {
    return {
      table: {
        widths: [100, '*',],
        body: [
          [{},
          {
            table: {
              widths: [100,'*'],
              body: [
                [{text: 'Remark:', fillColor: '#eeeeff',},
                 {text: estimateDetails.remark, alignment: 'center'}],
                [{text: 'Prepared by:', fillColor: '#eeeeff'},
                 {text: estimateDetails.preparedBy, alignment: 'center',}],
                [{text: 'Customer Name:', fillColor: '#eeeeff'},
                 {text: estimateDetails.customerName, alignment: 'center',}],
                [{text: 'Date:', fillColor: '#eeeeff'},
                 {text: estimateDetails.date, alignment: 'center',}],
                [{text: 'Contract period:', fillColor: '#eeeeff'},
                 {text: estimateDetails.contractPeriod, alignment: 'center',}],
                [{text: 'Configuration:', fillColor: '#eeeeff'},
                 {text: estimateDetails.configuration, alignment: 'center',}],
                [{text: 'Hub Site Variant:', fillColor: '#eeeeff'},
                 {text: estimateDetails.hubSiteVariant, alignment: 'center',}],
                [{text: 'Site Variant:', fillColor: '#eeeeff'},
                 {text: estimateDetails.siteVariants, alignment: 'center',}]

              ]
            },
            layout: {
              defaultBorder: false,
            },
            style: 'estimateDetails'
          }
          ]
        ]
      },
      layout: {
				defaultBorder: false,
			}
    };
  }

  getFooter() {
    return {
			ol: [
				'Estimate = non-binding offer',
				'All prices are in Euro',
				'Validity quotation is 30 days',
        'Prices internal cabling not included',
        'Prices cabling private domain not included',
        'VAT not included',
        'Rental & Maintenance are monthly fees',
        'Offer for informational use and not binding'
			],
      type: 'none',
      style: 'footer'
		}
  }

  pdfDetails = {
    estimateDetails: {
      remark: 'Connectivity Prices are only indicative',
      preparedBy: 'David Mobers',
      customerName: 'Proximus ART',
      date: '03/03/2021',
      contractPeriod: '3 years',
      configuration: 'Hub & Spoke',
      hubSiteVariant: '1',
      siteVariants: '1'
    },
    variantList : [
      {
        variantName: 'Variant_1',
        siteType: 'Small Branch with 4G protection',
        sitesCount: '1',
        setup: 'Backup',
        mainConnectivity: {selection: 'Pro (up 40/down 100)', installation: '59,00', rental: '59,00'},
        secondConnectivity: {selection: 'Mobile backup (up 20/down 75)', installation: '59,00', rental: '59,00'},
        sdwanCpe: {selection: 'MX67 (VPN : max 200 Mbps/non-VPN : max. 300 Mbps)', installation: '', rental: '59,00'},
        mobileConnectivityCpe: {selection: 'MG21 with power injector', installation: '', rental: '59,00'},
        sla: {selection: 'SLA Same day - Meraki (Standard SDWAN Full PXS SLA)', installation: '', rental: '59,00'},
        security: {selection: 'Advanced', installation: '100,00', rental: '47,29'},
        totalSite: '1',
        totalInstallationCost: '50009',
        totalRental: '20891'
      },
      {
        variantName: 'Variant_2',
        siteType: 'Small Branch with 5G protection',
        sitesCount: '4',
        setup: 'Backup',
        mainConnectivity: {selection: 'Pro (up 40/down 100)', installation: '59,00', rental: '59,00'},
        secondConnectivity: {selection: 'Mobile backup (up 20/down 75)', installation: '59,00', rental: '59,00'},
        sdwanCpe: {selection: 'MX67 (VPN : max 200 Mbps/non-VPN : max. 300 Mbps)', installation: '', rental: '59,00'},
        mobileConnectivityCpe: {selection: 'MG21 with power injector', installation: '', rental: '59,00'},
        sla: {selection: 'SLA Same day - Meraki (Standard SDWAN Full PXS SLA)', installation: '', rental: '59,00'},
        security: {selection: 'Advanced', installation: '200,00', rental: '47,29'},
        totalSite: '1',
        totalInstallationCost: '50009',
        totalRental: '20891'
      }
    ]
  }

  getVariantDetails(pdfDetails) {
    let pdfContent = [];

    pdfDetails.variantList.forEach((element, index) => {
      let variantTable = {
        table: {
          widths: [100, '*', 20, 200, '*', 'auto'],
          body : [
            [{text: `Site Variant ${index}`, style:'variantHeader'},
             {text: 'Item', style:'variantHeader'},
             {text: '#', style:'variantHeader'},
             {text: 'Selection', style:'variantHeader'},
             {text: 'Installation', style:'variantHeader'},
             {text: 'Rental', style:'variantHeader'}],
            [{text: element.variantName, border: [true,false,false,false], style:'variantBody'},
              {text: 'Site Type:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.siteType, style:'variantBody'},
              {},
              {}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: '# Sites', fillColor: '#eeeeff', style:'variantBody'},
              {text: element.sitesCount, style:'variantBody'},
              {},
              {},
              {}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'Setup:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.setup, style:'variantBody'},
              {},
              {}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'Main Connectivity:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.mainConnectivity.selection, style:'variantBody'},
              {text: element.mainConnectivity.installation, style:'variantBody'},
              {text: element.mainConnectivity.rental, style:'variantBody'}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'Second Connectivity:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.secondConnectivity.selection, style:'variantBody'},
              {text: element.secondConnectivity.installation, style:'variantBody'},
              {text: element.secondConnectivity.rental, style:'variantBody'}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'SDWAN CPE:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.sdwanCpe.selection, style:'variantBody'},
              {text: element.sdwanCpe.installation, style:'variantBody'},
              {text: element.sdwanCpe.rental, style:'variantBody'}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'Mobile Connectivity CPE:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.mobileConnectivityCpe.selection, style:'variantBody'},
              {text: element.mobileConnectivityCpe.installation, style:'variantBody'},
              {text: element.mobileConnectivityCpe.rental, style:'variantBody'}
            ],
            [{text:'',border: [true,false,false,false]},
              {text: 'SLA:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.sla.selection, style:'variantBody'},
              {text: element.sla.installation, style:'variantBody'},
              {text: element.sla.rental, style:'variantBody'}
            ],
            [{text:'',border: [true,false,false,true]},
              {text: 'Security:', fillColor: '#eeeeff', style:'variantBody'},
              {},
              {text: element.security.selection, style:'variantBody'},
              {text: element.security.installation, style:'variantBody'},
              {text: element.security.rental, style:'variantBody'}
            ]
            //   {
            //     table: {
            //       widths: ['*', 20, 200, '*', 'auto'],
            //       body: [
            //         [{text: 'Site Type:', fillColor: '#eeeeff'},{},{text: element.siteType},{},{}],
            //         [{text: '# Sites', fillColor: '#eeeeff'},{text: element.sitesCount},{},{},{}],
            //         [{text: 'Setup:', fillColor: '#eeeeff'},{},{text: element.setup},{},{}],
            //         [{text: 'Main Connectivity:', fillColor: '#eeeeff'},{},{text: element.mainConnectivity.selection},
            //         {text: element.mainConnectivity.installation},{text: element.mainConnectivity.rental}],
            //         [{text: 'Second Connectivity:', fillColor: '#eeeeff'},{},{text: element.secondConnectivity.selection},
            //         {text: element.secondConnectivity.installation},{text: element.secondConnectivity.rental}],
            //         [{text: 'SDWAN CPE:', fillColor: '#eeeeff'},{},{text: element.sdwanCpe.selection},
            //         {text: element.sdwanCpe.installation},{text: element.sdwanCpe.rental}],
            //         [{text: 'Mobile Connectivity CPE:', fillColor: '#eeeeff'},{},{text: element.mobileConnectivityCpe.selection},
            //         {text: element.mobileConnectivityCpe.installation}, {text: element.mobileConnectivityCpe.rental}],
            //         [{text: 'SLA:', fillColor: '#eeeeff'},{},{text: element.sla.selection},
            //         {text: element.sla.installation},{text: element.sla.rental}],
            //         [{text: 'Security:', fillColor: '#eeeeff'},{},{text: element.security.selection},
            //         {text: element.security.installation},{text: element.security.rental}]
            //
            //       ]
            //     },
            //     layout: {
            //       defaultBorder: false,
            //     }
            //   }
            // ]
          ]
        }
      }
      pdfContent.push([this.getHeader(pdfDetails.estimateDetails),this.getEstimateDetails(pdfDetails.estimateDetails),variantTable,this.getFooter()]);
      if (index != (pdfDetails.variantList.length-1)) {
        pdfContent.push({text:'', pageBreak: 'after'});
      }
    });

    return pdfContent;
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }

}
