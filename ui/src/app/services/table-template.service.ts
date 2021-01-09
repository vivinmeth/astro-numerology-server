import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableTemplateService {
  IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  Planets =  ['சூரி', 'சந்', 'செவ்', 'புத', 'குரு', 'சுக்', 'சனி', 'ராகு', 'கேது'];
  constructor() { }
  tableTemplates = {
    lagnam: {
      headers: ['ID', 'LAG', 'Degree', 'Min', 'Sec', 'Total'],
      rows: this.IDs,
      row_template: {
        LAG: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 12,
          isRequired: true
        },
        Degree: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        Min: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Sec: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Total: {
          type: 'number',
          isInput: false,
          defaultValue: 0,
        }
      }
    },
    planets: {
      headers: ['ID', 'LAG', 'Degree', 'Min', 'Sec', 'Total'],
      rows: this.Planets,
      row_template: {
        LAG: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 12,
          isRequired: true
        },
        Degree: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        Min: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Sec: {
          type: 'number',
          isInput: true,
          defaultValue: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Total: {
          type: 'number',
          isInput: false,
          defaultvalue: 0,
        }
      }
    },
    PZM: {
      headers: ['ID', 'Degree', 'RA', 'NA', 'UA'],
      rows: this.IDs,
      row_template: {
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
      }
    }
  };



  tableTemplateGenerator(orderObj): any{
    let tableObj = {...({
      order: []
    })};
    console.log('before:', tableObj);
    for (const tableset of orderObj){
      const orderIndex = orderObj.indexOf(tableset);
      tableObj.order[orderIndex] = [];
      console.log(orderIndex, tableset);
      for (const table of tableset){
          const tableKey = table.template + (Math.random().toString());
          tableObj.order[orderIndex].push({ name: table.name, key: tableKey});
          if (this.tableTemplates[table.template]){
            console.log(tableObj, table, tableKey);
            tableObj[tableKey] = {...this.tableTemplates[table.template]};
            if (table.runOverrides){
    //           // tslint:disable-next-line:forin
              for (const override in table.overrides){
                tableObj[tableKey][override] = [...table.overrides[override]];
                console.log(this.IDs, tableObj[tableKey][override]);
              }
            }
        }
      }
    }
    console.log('after:', tableObj);
    return tableObj;
  }
}
