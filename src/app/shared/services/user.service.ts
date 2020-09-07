import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private _httpService: HttpService) { }

  loadAll(payload?: any): Observable<User[]> {
    const url = `${this.API_BASE_URL}/users`;

    return this._httpService.get(url, payload).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<User> {
    const url = `${this.API_BASE_URL}/users/${id}`;

    return this._httpService.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<User> {
    const url = `${this.API_BASE_URL}/users`;

    return this._httpService.post(url, payload).pipe(map((result: any) => result));
  }
  update(id: number, payload: any): Observable<User> {
    const url = `${this.API_BASE_URL}/users/${id}`;

    return this._httpService.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
