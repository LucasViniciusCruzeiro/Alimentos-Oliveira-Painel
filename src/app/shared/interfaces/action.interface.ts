import { Action } from '@ngrx/store';

export class ActionInterface implements Action {
    type: string;
    payload: any;
}
