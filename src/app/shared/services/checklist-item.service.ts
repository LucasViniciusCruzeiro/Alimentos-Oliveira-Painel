import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckListItems } from '../models/checklist-item.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CheckListItemService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) {
    this.API_BASE_URL = environment.API;
   }

  loadAll(payload?: any): Observable<CheckListItems[]> {
    const url = `${this.API_BASE_URL}/checklist-items`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<CheckListItems> {
    const url = `${this.API_BASE_URL}/checklist-items/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<CheckListItems> {
    const url = `${this.API_BASE_URL}/checklist-items`;

    return this._httpService.post(url, payload);
  }
  update(id: number, payload: any): Observable<CheckListItems> {
    const url = `${this.API_BASE_URL}/checklist-items/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
