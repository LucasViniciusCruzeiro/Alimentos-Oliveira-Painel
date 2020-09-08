import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { Factory } from '../models/factory.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<Factory[]> {
    const url = `${this.API_BASE_URL}/vehicle-types`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Factory> {
    const url = `${this.API_BASE_URL}/vehicle-types/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/vehicle-types`;

    return this.http.post(url, payload);
  }

  update(id: number, payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/vehicle-types/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/vehicle-types/${id}`;

    return this.http.delete(url).pipe(map((result: any) => result));
  }

};