import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { environment } from './../../../environments/environment';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})

export class DriverService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<Driver[]> {
    const url = `${this.API_BASE_URL}/drivers`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: string | number): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers`;

    return this.http.post(url, payload).pipe(map((result: any) => result));
  }
  update(id: string | number, payload: any): Observable<Driver> {
    const url = `${this.API_BASE_URL}/drivers/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: string | number): boolean {
    return;
  }

}
