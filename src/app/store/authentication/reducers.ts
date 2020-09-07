import { ActionTypes } from '../authentication/actions';
import { ActionInterface } from 'app/shared/interfaces/action.interface';
import { Auth } from 'app/shared/models/auth.model';

export const initialState = new Auth();


export function authReducer(state = initialState, action: ActionInterface): Auth {
    switch (action.type) {
        case ActionTypes.SET:
            {
                state = action.payload;
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
