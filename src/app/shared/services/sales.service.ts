import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { Sales } from '../models/sales.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<Sales[]> {
    const url = `${this.API_BASE_URL}/sales`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Sales> {
    const url = `${this.API_BASE_URL}/sales/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Sales> {
    const url = `${this.API_BASE_URL}/sales`;

    return this.http.post(url, payload).pipe(map((result: any) => result));
  }

  update(id: number, payload: any): Observable<Sales> {
    const url = `${this.API_BASE_URL}/sales/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/sales/${id}`;

    return this.http.delete(url).pipe(map((result: any) => result.data));
  }

}
