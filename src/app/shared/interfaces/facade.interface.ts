import { Observable } from 'rxjs';

export interface FacadeInterface {
  items$: Observable<any[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  loadAllRequest(params?: any): void;
  loadOneRequest(id: number | string): void;
  createRequest(payload: any): void;
  updateRequest(id: number | string): void;
  destroyRequest(id: number | string): void;
}
