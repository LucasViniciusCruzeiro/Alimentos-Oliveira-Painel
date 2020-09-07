import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { Forecasts } from '../models/forecast.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) {
    this.API_BASE_URL = environment.API;
   }

  loadAll(payload?: any): Observable<Forecasts[]> {
    const url = `${this.API_BASE_URL}/forecasts`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Forecasts> {
    const url = `${this.API_BASE_URL}/forecasts/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Forecasts> {
    const url = `${this.API_BASE_URL}/forecasts`;

    return this._httpService.post(url, payload);
  }
  update(id: number, payload: any): Observable<Forecasts> {
    const url = `${this.API_BASE_URL}/forecasts/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
