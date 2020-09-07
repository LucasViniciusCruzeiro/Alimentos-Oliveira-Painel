import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { State } from '../models/state.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class StateService implements ServiceInterface {
  API_BASE_URL: string;

  constructor(
    private _httpService: HttpService
  ) {
    this.API_BASE_URL = environment.API;
  }

  loadAll(payload?: any): Observable<State[]> {
    const url = `${this.API_BASE_URL}/states`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<State> {
    const url = `${this.API_BASE_URL}/states/${id}`;
    
    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }
  
  create(payload: any): Observable<State> {
    const url = `${this.API_BASE_URL}/states`;
    
    return this._httpService.post(url, payload).pipe(map((result: any) => result.data));
  }

  update(id: number, payload: any): Observable<State> {
    const url = `${this.API_BASE_URL}/states/${id}`;
    
    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }

  destroy(id: number): boolean {
    return ;
  }
}
