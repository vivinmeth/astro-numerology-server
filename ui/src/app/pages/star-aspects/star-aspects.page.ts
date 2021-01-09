import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CSRFTokenService} from '../../services/csrftoken.service';

@Component({
  selector: 'app-star-aspects',
  templateUrl: './star-aspects.page.html',
  styleUrls: ['./star-aspects.page.scss']
})
export class StarAspectsPage implements OnInit {

  IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  Planets =  ['சூரி', 'சந்', 'செவ்', 'புத', 'குரு', 'சுக்', 'சனி', 'ராகு', 'கேது'];
  Inputs: Array<string> = ['LAG', 'Deg', 'Min', 'Sec'];
  Columns: Array<string> = this.Inputs.concat( ['DecimalDeg',
    '1', 'DecimalDeg - 1', 'RA - 1', 'NA - 1', 'UA - 1',
    '5', 'DecimalDeg - 5', 'RA - 5', 'NA - 5', 'UA - 5',
    '7', 'DecimalDeg - 7', 'RA - 7', 'NA - 7', 'UA - 7',
    '9', 'DecimalDeg - 9', 'RA - 9', 'NA - 9', 'UA - 9',
  ]);
  tables = {
    order: [['lagnam', 'PZM_1', 'PZM_5', 'PZM_7', 'PZM_9'], ['planets']],
    lagnam: {
      headers: ['ID', 'LAG', 'Degree', 'Min', 'Sec', 'Total'],
      rows: this.IDs,
      row_template: {
       LAG: {
         type: 'number',
         isInput: true,
         value: 0,
         min: 0,
         max: 12,
         isRequired: true
       },
        Degree: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        Min: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Sec: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Total: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
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
          value: 0,
          min: 0,
          max: 12,
          isRequired: true
        },
        Degree: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        Min: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Sec: {
          type: 'number',
          isInput: true,
          value: 0,
          min: 0,
          max: 59,
          isRequired: true
        },
        Total: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
        }
      }
    },
    PZM_1: {
      headers: ['ID', 'Degree', 'RA', 'NA', 'UA'],
      rows: this.IDs,
      row_template: {
        Degree: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        RA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        NA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        UA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 359,
        }
      }
    },
    PZM_5: {
      headers: ['ID', 'Degree', 'RA', 'NA', 'UA'],
      rows: this.IDs.map((id) => {
        return id + 4;
      }),
      row_template: {
        Degree: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        RA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        NA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        UA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 359,
        }
      }
    },
    PZM_7: {
      headers: ['ID', 'Degree', 'RA', 'NA', 'UA'],
      rows: this.IDs.map((id) => {
        return id + 6;
      }),
      row_template: {
        Degree: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        RA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        NA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        UA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 359,
        }
      }
    },
    PZM_9: {
      headers: ['ID', 'Degree', 'RA', 'NA', 'UA'],
      rows: this.IDs.map((id) => {
        return id + 8;
      }),
      row_template: {
        Degree: {
          type: 'number',
          isInput: false,
          value: 0,
          min: 0,
          max: 359,
          isRequired: true
        },
        RA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        NA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 59,
          isRequired: true
        },
        UA: {
          type: 'text',
          isInput: false,
          value: '',
          min: 0,
          max: 359,
        }
      }
    }
  };

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('astrology/get_lord_planets?decimalDegs=[331.33, 29.55, 90.04, 156.18]', {}).subscribe(res => {
      console.log(res);
    });
    console.dir(this.tables);
  }
  computeDegDec(): void{
   console.log('Computing Degree Decimals...');
  }

}
