import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) { }


  auth(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/auth`;

    return this._httpService.post(url, payload);
  }

  forgot(email: any): Observable<any> {
    const url = `${this.API_BASE_URL}/auth/forgot-password`;

    return this._httpService.post(url, {email});
  }

  reset(payload: any): Observable<any> {
    const url = `${this.API_BASE_URL}/auth/reset-password`;

    return this._httpService.post(url, payload);
  }

}
