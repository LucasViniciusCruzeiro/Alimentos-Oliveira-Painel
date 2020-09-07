import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { ShippingCompany } from '../models/shipping-company.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingCompanyService implements ServiceInterface {
  API_BASE_URL: string;

  constructor(
    private _httpService: HttpService
  ) {
    this.API_BASE_URL = environment.API;
  }

  loadAll(payload?: any): Observable<ShippingCompany[]> {
    const url = `${this.API_BASE_URL}/shipping-companies`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<ShippingCompany> {
    const url = `${this.API_BASE_URL}/shipping-companies/${id}`;
    
    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }
  
  create(payload: any): Observable<ShippingCompany> {
    const url = `${this.API_BASE_URL}/shipping-companies`;
    
    return this._httpService.post(url, payload).pipe(map((result: any) => result.data));
  }

  update(id: number, payload: any): Observable<ShippingCompany> {
    const url = `${this.API_BASE_URL}/shipping-companies/${id}`;
    
    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): Observable<any> {
    const url = `${this.API_BASE_URL}/shipping-companies/${id}`;
    
    return this._httpService.delete(url).pipe(map((result: any) => result.data));
  }

}
