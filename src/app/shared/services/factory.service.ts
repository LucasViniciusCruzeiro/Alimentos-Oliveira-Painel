import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { Factory } from '../models/factory.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) {
    this.API_BASE_URL = environment.API;
   }

   loadAllNotAuth(payload?: any): Observable<Factory[]> {
     const url = `${this.API_BASE_URL}/factories/all/not-auth`;
 
     return this._httpService.get(url, payload).pipe(map((result: any) => result));
   }

   loadAll(payload?: any): Observable<Factory[]> {
     const url = `${this.API_BASE_URL}/factories`;
 
     return this._httpService.get(url, payload).pipe(map((result: any) => result));
   }

  loadOne(id: number): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories`;

    return this._httpService.post(url, payload).pipe(map((result: any) => result));
  }
  update(id: number, payload: any): Observable<Factory> {
    const url = `${this.API_BASE_URL}/factories/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return ;
  }

}
