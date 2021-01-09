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
      }
    ]
  ];
  tables = {
    order: []
  };


  constructor( private http: HttpClient, private tableTemplateService: TableTemplateService) { }

  ngOnInit(): void {
    this.http.get('astrology/get_lord_planets?decimalDegs=[331.33, 29.55, 90.04, 156.18]', {}).subscribe(res => {
      console.log(res);
    });
    this.tables = this.tableTemplateService.tableTemplateGenerator(this.order);
  }
  computeDegDec(): void{
   console.log('Computing Degree Decimals...');
  }


}
