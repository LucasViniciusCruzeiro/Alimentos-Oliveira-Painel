import { ActionTypes } from '../shipping-company/actions';

import { ShippingCompany } from 'app/shared/models/shipping-company.model';
import { ActionInterface } from 'app/shared/interfaces/action.interface';

export const initialState = new ShippingCompany();


export function shippingCompanyReducer(state = initialState, action: ActionInterface): ShippingCompany {
    switch (action.type) {
        case ActionTypes.ADD:
            {
                state = action.payload;
                return state;
            }

        case ActionTypes.REMOVE:
            {
                state = initialState;
                return state;
            }

        case ActionTypes.CLEAR:
            {
                state = initialState;
                return state;
            }

        default:
            return state;
    }
}
