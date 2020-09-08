import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { Factory } from '../models/factory.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FactoryService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) {
    this.API_BASE_URL = environment.API;
   }

  loadAll(payload?: any): Observable<Factory[]> {
    const url = `${this.API_BASE_URL}/factories`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories`;

    return this.http.post(url, payload);
  }
  update(id: number, payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
