import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CityService implements ServiceInterface {
  API_BASE_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_BASE_URL = environment.API;
  }

  loadAll(payload?: any): Observable<City[]> {
    const url = `${this.API_BASE_URL}/cities`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<City> {
    const url = `${this.API_BASE_URL}/cities/${id}`;
    
    return this.http.get(url).pipe(map((result: any) => result.data));
  }
  
  create(payload: any): Observable<City> {
    const url = `${this.API_BASE_URL}/cities`;
    
    return this.http.post(url, payload).pipe(map((result: any) => result.data));
  }

  update(id: number, payload: any): Observable<City> {
    const url = `${this.API_BASE_URL}/cities/${id}`;
    
    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/cities/${id}`;
    
    return this.http.delete(url).pipe(map((result: any) => result.data));
  }

}
