import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServiceInterface } from '../interfaces/service.interface';
import { Plaque } from '../models/plaque.model';
import { environment } from './../../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlaqueService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) { }

  loadAll(payload?: any): Observable<Plaque[]> {
    const url = `${this.API_BASE_URL}/plaques`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<Plaque> {
    const url = `${this.API_BASE_URL}/plaques/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<Plaque> {
    const url = `${this.API_BASE_URL}/plaques`;

    return this._httpService.post(url, payload).pipe(map((result: any) => result));
  }

  update(id: number, payload: any): Observable<Plaque> {
    const url = `${this.API_BASE_URL}/plaques/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result));
  }

  destroy(id: number): boolean {
    return ;
  }

}
