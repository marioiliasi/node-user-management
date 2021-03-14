import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import {User} from "../services/user";

export const userActions = {
    login,
    logout,
    register,
    getAllExternal,
    addEmpty,
    getById,
    create,
    refresh,
    update,
    _delete,
};

function addEmpty(user: User){
    return {
        type: userConstants.ADD_EMPTY,
        user
    };
}
function refresh(user: User){
    return {
        type: userConstants.REFRESH,
        user
    };
}

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

function create(user: User) {
    return (dispatch: any) => {
        dispatch(request(user));

        userService.create(user)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(user: User) { return { type: userConstants.CREATE_REQUEST, user } }
    function success(user: User) { return { type: userConstants.CREATE_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.CREATE_FAILURE, error } }
}

function update(user: User) {
    return (dispatch: any) => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(user: User) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user: User) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function _delete(id: string) {
    return (dispatch: any) => {
        if(id){
            dispatch(request(id));

            userService.delete(id)
                .then(
                    user => dispatch(success(id)),
                    error => dispatch(failure(id, error.toString()))
                );
        } else {
            dispatch(success(id));
        }
    };

    function request(id: string) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id: string) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id: string, error: any) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
