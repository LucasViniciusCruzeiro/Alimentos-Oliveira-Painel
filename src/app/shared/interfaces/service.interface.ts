import { Observable } from 'rxjs';

export interface ServiceInterface {
  API_BASE_URL: string;

  loadAll(payload?: any): Observable<any[]>;
  loadOne(id: number): Observable<any>;
  create(payload: any): Observable<any>;
  update(id: number, payload: any): Observable<any>;
  destroy(id: number): any;
}
