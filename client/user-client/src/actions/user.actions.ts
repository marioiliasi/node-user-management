import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllExternal,
    getById,
};

function login(email: string, password: string, from: any) {
    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user: any) {
    return (dispatch: any) => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user: any) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllExternal() {
    return (dispatch: any) => {
        dispatch(request());

        userService.getAllExternal()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id: string) {
    return (dispatch: any) => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user: any) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: string) {
    return (dispatch: any) => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id: string) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id: string) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id: string, error: any) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
