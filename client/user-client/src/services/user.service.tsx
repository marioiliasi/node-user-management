import { authHeader } from '../helpers';
import {User} from "./user";
import jwt from 'jsonwebtoken';
const apiUrl: string = 'http://localhost:3001';

export const userService = {
    login,
    logout,
    register,
    getAllExternal,
    getById,
    create,
    update,
    delete: _delete
};

function login(email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwordEncrypted: password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(resp => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(resp.token));
            const user: any = jwt.decode(resp.token, {complete: true});
            localStorage.setItem('user', JSON.stringify(user.payload));
            return user.payload;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function getAllExternal() {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/external`, requestOptions).then(handleResponse);
}

function getById(id: string) {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function create(user: User) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);;
}

function update(user: User) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: string) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // ts-ignore
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
