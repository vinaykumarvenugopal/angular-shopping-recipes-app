import { User } from "../user.model";
import * as Actions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
  }
  
const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, 
    action: Actions.AuthActions) {
    
    switch(action.type) {
        case Actions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
              );

            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            };
        case Actions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case Actions.LOGIN_START:
        case Actions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case Actions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        case Actions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
   
}