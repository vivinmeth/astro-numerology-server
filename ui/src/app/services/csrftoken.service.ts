import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CSRFTokenService{
  token = '';



  setCookie(name, value, days): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }
}
