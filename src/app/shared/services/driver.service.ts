import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { environment } from './../../../environments/environment';
import { Driver } from '../models/driver.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class DriverService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) { }

  loadAll(payload?: any): Observable<Driver[]> {
    const url = `${this.API_BASE_URL}/drivers`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers`;

    return this._httpService.post(url, payload).pipe(map((result: any) => result));
  }
  update(id: number, payload: any): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
