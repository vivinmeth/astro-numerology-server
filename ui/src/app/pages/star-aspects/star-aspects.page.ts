import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CSRFTokenService} from '../../services/csrftoken.service';

@Component({
  selector: 'app-star-aspects',
  templateUrl: './star-aspects.page.html',
  styleUrls: ['./star-aspects.page.scss']
})
export class StarAspectsPage implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('astrology/get_lord_planets?decimalDegs=[331.33, 29.55, 90.04, 156.18]', {}, {
    }).subscribe(res => {
      console.log(res);
    });
  }
}
