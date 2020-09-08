import { Action } from '@ngrx/store';
import { ShippingCompanyInterface } from '../../shared/interfaces/shipping-company.interface';

export enum ActionTypes {
    ADD = '[Shipping Company] ADD',
    REMOVE = '[Shipping Company] REMOVING',
    CLEAR = '[Shipping Company] CLEANNING',
}


export const Add = (shippingCompany: ShippingCompanyInterface) => {
    return { type: ActionTypes.ADD, payload: shippingCompany } as Action;
};

export const Remove = (shippingCompany: ShippingCompanyInterface) => {
    return { type: ActionTypes.REMOVE, payload: shippingCompany } as Action;
};

export const Clear = () => {
    return { type: ActionTypes.CLEAR, payload: null } as Action;
};
