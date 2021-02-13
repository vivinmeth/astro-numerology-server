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
  updates = [];
  #pzmCache = {};


  constructor( private http: HttpClient, private tableTemplateService: TableTemplateService) { }

  ngOnInit(): void {
    this.tables = this.tableTemplateService.tableTemplateGenerator(this.order);
    this.tablesDFrame = this.tableTemplateService.tableDFrameGenerator(this.tables);
    console.log(this.tablesDFrame);
  }

  #PZMCacheGet = async (decimalDegs: Array<number>): Promise<any> => {
    const pzm = {
    };
    const unfoundDD = [];
    for (const dd of decimalDegs){
      if (this.#pzmCache.hasOwnProperty(dd)){
        pzm[dd] = this.#pzmCache[dd];
      }
      else{
        unfoundDD.push(dd);
      }
    }
    return {
      pzm,
      unfoundDD
    };
  }

  #PZMCacheSet = async (pzm): Promise<void> => {
    console.log("Setting cache ->", pzm);
    for (const dd in pzm){
      if (pzm.hasOwnProperty(dd)){
        this.#pzmCache[dd] = pzm[dd];
      }
    }
    console.log("PZMCache", this.#pzmCache);
  }

  async getpzm(decimalDegs: Array<number>): Promise<any>{
    const neededDD = [];
    let pzm;
    const pzmCache = await this.#PZMCacheGet(decimalDegs);
    console.log('from pzmCache ->', pzmCache);
    pzm = {...pzmCache.pzm};
    if (pzmCache.unfoundDD.length !== 0){
      neededDD.push(...pzmCache.unfoundDD);
    }
    if (neededDD.length !== 0){
      const data = await this.http.get(`astrology/get_lord_planets?decimalDegs=[${neededDD}]`, {}).toPromise();
      if (data['success']){
        for (const dd in data['decimalDegs']){
          if (data['decimalDegs'].hasOwnProperty(dd)){
            pzm[dd] = data['decimalDegs'][dd];
          }
        }
        this.#PZMCacheSet(data['decimalDegs']);
      }
      else {
        for (const dd of neededDD){
          pzm[dd] = undefined;
        }
      }
    }
    return pzm;
  }

  async newUpdate(table, tableRow, row): Promise<void>{
    let updated = false;
    for (const update of this.updates){
      if (update.tableRow === tableRow && update.table === table && update.row === row){
          updated = true;
          break;
      }
      else{
        updated = false;
      }
    }
    if (!updated){
      this.updates.push({
        tableRow,
        table,
        row
      });
    }
    console.log(this.updates);
  }

  updateAllPZM(): void{
    console.log('Updating changes ->', this.updates);
    for (const update of this.updates){
      if (update.tableRow === 0){
        this.updateLagPZM(update.table, update.row);
      }
      else if (update.tableRow === 1){
        this.updatePlanetsPMZ(update.table, update.row);
      }
    }
    this.updates = [];
  }

  async updateLagPZM(table, row): Promise<void>{
    const pmzKey = {
      0: this.tables.order[0][1].key,
      1: this.tables.order[0][2].key,
      2: this.tables.order[0][3].key,
      3: this.tables.order[0][4].key
    };
    const pmz = {
      0: row,
      1: this.rangeRotate(row + 4, 12),
      2: this.rangeRotate(row + 6, 12),
      3: this.rangeRotate(row + 8, 12)
    };


    const DDs = [
      this.tablesDFrame[pmzKey[0]][pmz[0]].Degree,
      this.tablesDFrame[pmzKey[1]][pmz[1]].Degree,
      this.tablesDFrame[pmzKey[2]][pmz[2]].Degree,
      this.tablesDFrame[pmzKey[3]][pmz[3]].Degree
    ];

    const pzmap = await this.getpzm(DDs);
    console.log("PZM:", DDs, pzmap);
    let i = 0;
    for (const dd of DDs){
      console.log('DD', dd, pzmap[dd]);
      this.tablesDFrame[pmzKey[i]][pmz[i]].RA = pzmap[dd].RA;
      this.tablesDFrame[pmzKey[i]][pmz[i]].UA = pzmap[dd].UA;
      this.tablesDFrame[pmzKey[i]][pmz[i]].NA = pzmap[dd].NA;
      i++;
    }

  }

  async updatePlanetsPMZ(table, row): Promise<void>{
    const pmzKey = {
      0: this.tables.order[1][1].key,
      1: this.tables.order[1][2].key,
      2: this.tables.order[1][3].key,
      3: this.tables.order[1][4].key
    };
    const pmz = {
      0: row,
      1: row,
      2: row,
      3: row
    };


    const DDs = [
      this.tablesDFrame[pmzKey[0]][pmz[0]].Degree,
      this.tablesDFrame[pmzKey[1]][pmz[1]].Degree,
      this.tablesDFrame[pmzKey[2]][pmz[2]].Degree,
      this.tablesDFrame[pmzKey[3]][pmz[3]].Degree
    ];

    const pzmap = await this.getpzm(DDs);
    console.log("PZM:", DDs, pzmap);
    let i = 0;
    for (const dd of DDs){
      console.log('DD', dd, pzmap[dd]);
      this.tablesDFrame[pmzKey[i]][pmz[i]].RA = pzmap[dd].RA;
      this.tablesDFrame[pmzKey[i]][pmz[i]].UA = pzmap[dd].UA;
      this.tablesDFrame[pmzKey[i]][pmz[i]].NA = pzmap[dd].NA;
      i++;
    }
  }

  onEnter(event, cb, ...args): void{
    if (event.keyCode === 13){
      cb.apply(this, args);
    }
  }

  onNotEnter(event, cb, ...args): void{
    if (event.keyCode !== 13){
      cb.apply(this, args);
    }
  }

  enter(): void{
    console.log('EnterPressed');
  }

  computeDegDec(id, tableRow, table, row, columnName): void{
    console.log('Computing Degree Decimals...', typeof row);
    const LAG = this.tablesDFrame[table][row].LAG;
    const DEG = this.tablesDFrame[table][row].Degree;
    const Min = this.tablesDFrame[table][row].Min;
    const Sec = this.tablesDFrame[table][row].Sec;
    if (LAG && LAG !== 0 ){
      // DDOne = ((LAG - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
      const DDOne = this.rangeRotate(((LAG - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
      // DDFive = ((five - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
      const five = tableRow === 0 ? this.rangeRotate(id + 4, 12) : this.tablesDFrame[this.tables.order[tableRow][2].key][row].ID;
      const DDFive = this.rangeRotate(((five - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
      // DDSeven = (((seven) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
      const seven = tableRow === 0 ? this.rangeRotate(id + 6, 12) : this.tablesDFrame[this.tables.order[tableRow][3].key][row].ID ;
      const DDSeven = this.rangeRotate(((seven - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
      // DDNine = (((nine) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
      const nine = tableRow === 0 ? this.rangeRotate(id + 8, 12) : this.tablesDFrame[this.tables.order[tableRow][4].key][row].ID ;
      const DDNine = this.rangeRotate(((nine - 1) * 30) + (DEG) + (Min / 60) + (Sec / 3600), 360);
      console.log(five, DDFive, seven, DDSeven, nine, DDNine);
      this.tablesDFrame[table][row].Total = parseFloat(DDOne.toFixed(2));
      this.tablesDFrame[this.tables.order[tableRow][1].key][row].Degree = parseFloat(DDOne.toFixed(2));
      if (tableRow === 0){
        this.tablesDFrame[this.tables.order[tableRow][2].key][five].Degree = parseFloat(DDFive.toFixed(2));
        this.tablesDFrame[this.tables.order[tableRow][3].key][seven].Degree = parseFloat(DDSeven.toFixed(2));
        this.tablesDFrame[this.tables.order[tableRow][4].key][nine].Degree = parseFloat(DDNine.toFixed(2));
      }
      else if (tableRow === 1){
        this.tablesDFrame[this.tables.order[tableRow][2].key][row].Degree = parseFloat(DDFive.toFixed(2));
        this.tablesDFrame[this.tables.order[tableRow][3].key][row].Degree = parseFloat(DDSeven.toFixed(2));
        this.tablesDFrame[this.tables.order[tableRow][4].key][row].Degree = parseFloat(DDNine.toFixed(2));
      }
      this.newUpdate(table, tableRow, row);
    }

  }



  getPZMRow(LA): any{
    const planetsID = this.tables.order[1][0].key;
    for (const ID in this.tablesDFrame[planetsID]){
      if (this.tablesDFrame[planetsID].hasOwnProperty(ID)){
        if (LA === this.tablesDFrame[planetsID][ID].LAG){
          return ID;
        }
      }
    }
  }

  pzmIndexUpdateRev(table, row, col): void{
    console.log('updateRev', row, col);
    if (col === 'LAG'){
      const LA = this.tablesDFrame[table][row][col];
      const pzm1 = row;
      console.log(table, this.tables.order[0][1].key, row, pzm1);
      const upRow = this.getPZMRow(LA);
      if (LA && LA !== 0){
        this.updateIndex(LA, pzm1, upRow);
      }
    }
  }

  pzmIndexUpdate(table, row, col): void{
    if (col === 'LAG'){
      const LA = this.tablesDFrame[table][row][col];
      const pzm1 = this.IndexLookup(LA);
      if (LA && LA !== 0){
        this.updateIndex(LA, pzm1, row);
      }
    }
  }

  updateIndex(LA, pzm1, row): void{
    const pzm5 = this.rangeRotate(pzm1 + 4, 12);
    const pzm7 = this.rangeRotate(pzm1 + 6, 12);
    const pzm9 = this.rangeRotate(pzm1 + 8, 12);
    console.log(row, LA, pzm1, pzm5, pzm7, pzm9);
    console.log(this.tablesDFrame);
    if (LA && row && pzm1){
      this.tablesDFrame[this.tables.order[1][1].key][row].ID = pzm1;
      this.tablesDFrame[this.tables.order[1][2].key][row].ID = pzm5;
      this.tablesDFrame[this.tables.order[1][3].key][row].ID = pzm7;
      this.tablesDFrame[this.tables.order[1][4].key][row].ID = pzm9;
    }
  }

  IndexLookup(LA: number): number{
    const lagnamID = this.tables.order[0][0].key;
    console.log('lagnamID', lagnamID);
    for (const ID in this.tablesDFrame[lagnamID]){
      if (this.tablesDFrame[lagnamID].hasOwnProperty(ID)){
        console.log(ID);
        if (LA === this.tablesDFrame[lagnamID][ID].LAG){
          return parseInt(ID, 10);
        }
      }
    }
  }

  rangeRotate(val: number, max: number): number{ return val <= max ? val : val - max; }




}
