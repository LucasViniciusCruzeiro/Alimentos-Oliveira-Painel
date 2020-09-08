import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInterface } from '../interfaces/service.interface';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ServiceInterface {
  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  loadAll(payload?: any): Observable<User[]> {
    const url = `${this.API_BASE_URL}/users`;

    return this.http.get(url, { params: payload }).pipe(map((result: any) => result));
  }

  loadOne(id: number): Observable<User> {
    const url = `${this.API_BASE_URL}/users/${id}`;

    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  create(payload: any): Observable<User> {
    const url = `${this.API_BASE_URL}/users`;

    return this.http.post(url, payload);
  }
  update(id: number, payload: any): Observable<User> {
    const url = `${this.API_BASE_URL}/users/${id}`;

    return this.http.put(url, payload).pipe(map((result: any) => result.data));
  }
  destroy(id: number): boolean {
    return;
  }

}
