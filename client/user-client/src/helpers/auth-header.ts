export function authHeader() {
    const localStorageUser: any = localStorage.getItem('token');
    // return authorization header with jwt token
    let token = JSON.parse(localStorageUser);

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}
