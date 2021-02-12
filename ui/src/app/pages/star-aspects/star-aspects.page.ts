import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TableTemplateService} from '../../services/table-template.service';

@Component({
  selector: 'app-star-aspects',
  templateUrl: './star-aspects.page.html',
  styleUrls: ['./star-aspects.page.scss']
})
export class StarAspectsPage implements OnInit {

  IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  Planets =  ['சூரி', 'சந்', 'செவ்', 'புத', 'குரு', 'சுக்', 'சனி', 'ராகு', 'கேது'];
  order = [
    [
      {
        name: 'Lagnam',
        template: 'lagnam',
        runOverrides: false,
      },
      {
        name: 'PZM_-_1',
        template: 'PZM',
        runOverrides: false,
      },
      {
        name: 'PZM_-_5',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          rows: this.IDs.map(id => {
            const diff = 4;
            return id + diff <= 12 ? id + diff : (id + diff) - 12;
          }),
        }
      },
      {
        name: 'PZM_-_7',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          rows: this.IDs.map(id => {
            const diff = 6;
            return id + diff <= 12 ? id + diff : (id + diff) - 12;
          }),
        }
      },
      {
        name: 'PZM_-_9',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          rows: this.IDs.map(id => {
            const diff = 8;
            return id + diff <= 12 ? id + diff : (id + diff) - 12;
          }),
        }
      }
    ],
    [
      {
        name: 'Planets',
        template: 'planets',
        runOverrides: false,
      },
      {
        name: 'PZM_-_1',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          row_template: {
            ID: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            Degree: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            RA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            NA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            UA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            }
          },
          rows: this.Planets,
        }
      },
      {
        name: 'PZM_-_5',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          row_template: {
            ID: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            Degree: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            RA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            NA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            UA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            }
          },
          rows: this.Planets,
        }
      },
      {
        name: 'PZM_-_7',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          row_template: {
            ID: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            Degree: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            RA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            NA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            UA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            }
          },
          rows: this.Planets,
        }
      },
      {
        name: 'PZM_-_9',
        template: 'PZM',
        runOverrides: true,
        overrides: {
          row_template: {
            ID: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            Degree: {
              type: 'number',
              isInput: false,
              defaultValue: 0,
            },
            RA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            NA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            },
            UA: {
              type: 'text',
              isInput: false,
              defaultValue: '',
            }
          },
          rows: this.Planets,
        }
      }
    ]
  ];
  tables = {
    order: []
  };
  tablesDFrame = {};


  constructor( private http: HttpClient, private tableTemplateService: TableTemplateService) { }

  ngOnInit(): void {
    this.http.get('astrology/get_lord_planets?decimalDegs=[331.33, 29.55, 90.04, 156.18]', {}).subscribe(res => {
      console.log(res);
    });
    this.tables = this.tableTemplateService.tableTemplateGenerator(this.order);
    this.tablesDFrame = this.tableTemplateService.tableDFrameGenerator(this.tables);
    console.log(this.tablesDFrame);
  }
  computeDegDec(id, tableRow, table, row, columnName): void{
    console.log('Computing Degree Decimals...', typeof row);
    const LAG = this.tablesDFrame[table][row].LAG;
    const DEG = this.tablesDFrame[table][row].Degree;
    const Min = this.tablesDFrame[table][row].Min;
    const Sec = this.tablesDFrame[table][row].Sec;
    // DDOne = ((LAG - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
    const DDOne = this.rangeRotate(((LAG - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
    // DDFive = ((five - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
    const five = this.rangeRotate(id + 4, 12) ;
    const DDFive = this.rangeRotate(((five - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
    // DDSeven = (((seven) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
    const seven = this.rangeRotate(id + 6, 12) ;
    const DDSeven = this.rangeRotate(((seven - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
    // DDNine = (((nine) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
    const nine = this.rangeRotate(id + 8, 12) ;
    const DDNine = this.rangeRotate(((nine - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);

    this.tablesDFrame[table][id].Total = parseFloat(DDOne.toFixed(2));
    this.tablesDFrame[this.tables.order[tableRow][1].key][id].Degree = parseFloat(DDOne.toFixed(2));
    this.tablesDFrame[this.tables.order[tableRow][2].key][five].Degree = parseFloat(DDFive.toFixed(2));
    this.tablesDFrame[this.tables.order[tableRow][3].key][seven].Degree = parseFloat(DDSeven.toFixed(2));
    this.tablesDFrame[this.tables.order[tableRow][4].key][nine].Degree = parseFloat(DDNine.toFixed(2));
  }

  rangeRotate(val: number, max: number): number{ return val <= max ? val : val - max; }

  log(table, row, column_name): void{
    console.log('Updated ->', this.tablesDFrame[table][row][column_name]);

    console.log(this.tablesDFrame, this.tables.order[0][1].key, 'Updated!');
  }


}
