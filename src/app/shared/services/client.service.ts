import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { Client } from '../models/client.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<Client[]> {
    const url = `${this.API_BASE_URL}/clients`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Client> {
    const url = `${this.API_BASE_URL}/clients/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Client> {
    const url = `${this.API_BASE_URL}/clients`;

    return this.http.post(url, payload).pipe(map((result: any) => result));
  }

  update(id: number, payload: any): Observable<Client> {
    const url = `${this.API_BASE_URL}/clients/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/clients/${id}`;

    return this.http.delete(url).pipe(map((result: any) => result));
  }

};