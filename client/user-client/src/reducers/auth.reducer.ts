import { userConstants } from '../constants';

const localStorageUser: any = localStorage.getItem('user');
let user = JSON.parse(localStorageUser);
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: any) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
                token: action.token
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
                token: action.token
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
